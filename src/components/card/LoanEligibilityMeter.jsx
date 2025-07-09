import React, { useState, useEffect, useMemo } from "react";
import { AptosClient } from "aptos";

const CONTRACT_ADDRESS =
  "0xcc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec";
const NODE_URL = "https://fullnode.testnet.aptoslabs.com";

const LoanEligibilityMeter = ({
  walletAddress,
  score: propScore,
  factors: propFactors,
}) => {
  const [trustScoreData, setTrustScoreData] = useState(null);
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const [userLoans, setUserLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const client = useMemo(() => new AptosClient(NODE_URL), []);

  // Fetch trust score and related data from contract
  useEffect(() => {
    if (walletAddress) {
      fetchTrustScoreData();
    }
  }, [walletAddress]);

  const fetchTrustScoreData = async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch trust score
      const [trustScore, tier] = await client.view({
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::get_trust_score`,
        arguments: [walletAddress],
        type_arguments: [],
      });

      // Fetch max loan amount
      const [maxAmount] = await client.view({
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::get_max_loan_amount`,
        arguments: [walletAddress],
        type_arguments: [],
      });

      // Fetch user loans
      const [loanIds] = await client.view({
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::get_user_loans`,
        arguments: [walletAddress, CONTRACT_ADDRESS],
        type_arguments: [],
      });

      // Fetch TrustScoreNFT data for detailed metrics
      let detailedData = null;
      try {
        const resource = await client.getAccountResource(
          walletAddress,
          `${CONTRACT_ADDRESS}::elegent_defi_v2::TrustScoreNFT`
        );
        detailedData = resource.data;
      } catch (err) {
        console.log("TrustScoreNFT not found - user may need to create one");
      }

      setTrustScoreData({
        score: parseInt(trustScore),
        tier,
        detailedData,
      });
      setMaxLoanAmount(parseInt(maxAmount) / 1e8); // Convert from octas to APT
      setUserLoans(loanIds.map((id) => parseInt(id)));
    } catch (err) {
      console.error("Error fetching trust score data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Use contract data if available, otherwise fall back to props
  const score = trustScoreData?.score ?? propScore ?? 0;
  const tier = trustScoreData?.tier ?? "Beginner";

  const getBarColor = (score) => {
    if (score >= 80) return "bg-green-400";
    if (score >= 60) return "bg-yellow-400";
    if (score >= 40) return "bg-orange-400";
    return "bg-red-400";
  };

  const getEligibilityText = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  // Generate factors based on on-chain data
  const eligibilityFactors = useMemo(() => {
    if (propFactors) return propFactors;

    const detailed = trustScoreData?.detailedData;
    if (!detailed) {
      // Default factors when no on-chain data available
      return [
        { name: "Credit History", score: score, weight: 30 },
        {
          name: "Income Stability",
          score: Math.min(100, score + 5),
          weight: 25,
        },
        { name: "Debt-to-Income", score: Math.max(0, score - 10), weight: 20 },
        {
          name: "Collateral Value",
          score: Math.min(100, score + 10),
          weight: 15,
        },
        {
          name: "On-chain Activity",
          score: Math.max(0, score - 5),
          weight: 10,
        },
      ];
    }

    // Calculate factors based on actual on-chain metrics
    const loanHistoryScore =
      detailed.loan_count > 0
        ? Math.min(
            100,
            (parseInt(detailed.total_repaid) /
              Math.max(1, parseInt(detailed.total_borrowed))) *
              100
          )
        : score;

    const stakingScore =
      parseInt(detailed.staked_amount) > 0
        ? Math.min(
            100,
            Math.log10(parseInt(detailed.staked_amount) / 1e8 + 1) * 30 + 40
          )
        : Math.max(0, score - 20);

    const defaultScore =
      parseInt(detailed.defaults) === 0
        ? 100
        : Math.max(0, 100 - parseInt(detailed.defaults) * 25);

    const walletAgeScore = Math.min(
      100,
      Math.log10(Math.max(1, parseInt(detailed.wallet_age) / (24 * 60 * 60))) *
        20 +
        20
    );

    const earlyRepaymentScore =
      parseInt(detailed.early_repayments) > 0
        ? Math.min(100, parseInt(detailed.early_repayments) * 10 + 60)
        : score;

    return [
      { name: "Loan History", score: Math.round(loanHistoryScore), weight: 30 },
      { name: "Staking Activity", score: Math.round(stakingScore), weight: 25 },
      { name: "Default Risk", score: Math.round(defaultScore), weight: 20 },
      { name: "Wallet Age", score: Math.round(walletAgeScore), weight: 15 },
      {
        name: "Early Repayments",
        score: Math.round(earlyRepaymentScore),
        weight: 10,
      },
    ];
  }, [trustScoreData, propFactors, score]);

  const formatTier = (tier) => {
    const tierEmojis = {
      Beginner: "🔸",
      Silver: "🥉",
      Gold: "🥈",
      Elite: "🥇",
    };
    return `${tierEmojis[tier] || "🔸"} ${tier}`;
  };

  return (
    <div className="w-[360px] bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-6 shadow-lg shadow-cyan-500/10 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Loan Eligibility</h3>
        {walletAddress && (
          <button
            onClick={fetchTrustScoreData}
            disabled={isLoading}
            className="text-xs px-2 py-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded text-white transition-colors"
          >
            {isLoading ? "🔄" : "↻"} Refresh
          </button>
        )}
      </div>

      {/* Stylized Circular Score Meter */}
      <div className="relative mx-auto w-40 h-40 rounded-full border-8 border-white/10 bg-white/5 backdrop-blur-md shadow-inner shadow-cyan-500/10 flex items-center justify-center">
        {/* Optional animated glow ring */}
        <div className="absolute -inset-2 rounded-full bg-yellow-400/10 blur-xl animate-pulse"></div>

        <svg
          className="absolute inset-0 transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeLinecap="round"
            stroke="#facc15"
            strokeWidth="10"
            strokeDasharray="283"
            strokeDashoffset={`${283 - score * 2.83}`}
            fill="none"
          />
        </svg>

        <div className="text-center z-10">
          <div className="text-3xl font-bold bg-yellow-400 bg-clip-text text-transparent">
            {isLoading ? "..." : score}
          </div>
          <div className="text-sm text-gray-300">
            {getEligibilityText(score)}
          </div>
          {trustScoreData && (
            <div className="text-xs text-gray-400 mt-1">{formatTier(tier)}</div>
          )}
        </div>
      </div>

      {/* On-chain Metrics */}
      {trustScoreData && (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-cyan-400 font-bold">
              {maxLoanAmount.toFixed(2)} APT
            </div>
            <div className="text-gray-400">Max Loan</div>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <div className="text-green-400 font-bold">{userLoans.length}</div>
            <div className="text-gray-400">Active Loans</div>
          </div>
        </div>
      )}

      {/* Factor Breakdown */}
      <div className="space-y-4">
        <h4 className="font-semibold text-white border-b border-white/10 pb-2 flex items-center justify-between">
          Factors
          {trustScoreData && (
            <span className="text-xs text-green-400">🔗 On-chain</span>
          )}
        </h4>
        {eligibilityFactors.map((factor, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>{factor.name}</span>
              <span className="font-medium">
                {Math.min(100, Math.max(0, factor.score))}%
              </span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className={`h-2 ${getBarColor(
                  factor.score
                )} rounded-full transition-all duration-500`}
                style={{
                  width: `${Math.min(100, Math.max(0, factor.score))}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-xs">❌ {error}</p>
          <button
            onClick={fetchTrustScoreData}
            className="text-xs text-red-300 hover:text-red-200 underline mt-1"
          >
            Try again
          </button>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10 border border-white/10">
        <h5 className="font-semibold text-white mb-2">Recommendations</h5>
        <ul className="text-sm text-white/80 space-y-1 list-disc list-inside">
          {!trustScoreData && walletAddress && (
            <li className="text-yellow-400">
              Create a trust score to see real metrics
            </li>
          )}
          {score < 60 && (
            <>
              <li>Improve credit history with on-time payments</li>
              <li>Consider staking APT to boost your score</li>
              {trustScoreData?.detailedData?.defaults > 0 && (
                <li>Address any previous defaults</li>
              )}
            </>
          )}
          {score >= 60 && score < 80 && (
            <>
              <li>You qualify for standard rates</li>
              <li>Increase staking to unlock better terms</li>
              {trustScoreData?.detailedData?.early_repayments === 0 && (
                <li>Early loan repayments boost your score</li>
              )}
            </>
          )}
          {score >= 80 && (
            <>
              <li>Excellent! You qualify for our best rates</li>
              <li>Consider larger loan amounts if needed</li>
              <li>Your tier: {formatTier(tier)}</li>
            </>
          )}
        </ul>
      </div>

      {/* Trust Score Creation Prompt */}
      {!trustScoreData && walletAddress && !isLoading && !error && (
        <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm mb-2">
            💡 Connect your wallet to see real on-chain eligibility metrics
          </p>
          <p className="text-blue-200 text-xs">
            Create a trust score to unlock personalized loan terms
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanEligibilityMeter;
