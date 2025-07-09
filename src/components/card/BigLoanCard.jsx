import React, { useState, useEffect, useMemo } from "react";
import { AptosClient } from "aptos";

const CONTRACT_ADDRESS = "0xcc5e97e0015543dfac2d3e686fed214a7450e5c1efe15786dfde118987c3fbec";
const NODE_URL = "https://fullnode.testnet.aptoslabs.com";

const BigLoanCard = ({ loan: propLoan, walletAddress, loanId, onUpdate }) => {
  const [loanData, setLoanData] = useState(propLoan || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isExtending, setIsExtending] = useState(false);
  const [isRefinancing, setIsRefinancing] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  const client = useMemo(() => new AptosClient(NODE_URL), []);

  // Fetch loan details from contract if loanId is provided
  useEffect(() => {
    if (loanId && walletAddress && !propLoan) {
      fetchLoanDetails();
    }
  }, [loanId, walletAddress]);

  const fetchLoanDetails = async () => {
    if (!loanId || !walletAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const [id, borrower, amount, interestAmount, dynamicInterestRate, status, dueDate] = await client.view({
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::get_loan_details`,
        arguments: [loanId.toString(), CONTRACT_ADDRESS],
        type_arguments: []
      });

      // Convert contract data to display format
      const loanDetails = {
        id: parseInt(id),
        borrower,
        amount: `${(parseInt(amount) / 1e8).toFixed(2)} APT`,
        interestAmount: `${(parseInt(interestAmount) / 1e8).toFixed(2)} APT`,
        interestRate: `${(parseInt(dynamicInterestRate) / 100).toFixed(2)}%`,
        status: getStatusText(parseInt(status)),
        dueDate: new Date(parseInt(dueDate) * 1000).toLocaleDateString(),
        nextPayment: new Date(parseInt(dueDate) * 1000).toLocaleDateString(),
        remainingBalance: `${((parseInt(amount) + parseInt(interestAmount)) / 1e8).toFixed(2)} APT`,
        term: "30 days", // Based on your contract's fixed term
        monthlyPayment: `${((parseInt(amount) + parseInt(interestAmount)) / 1e8).toFixed(2)} APT`,
        type: "DeFi Loan"
      };

      setLoanData(loanDetails);
    } catch (err) {
      console.error("Error fetching loan details:", err);
      setError(`Failed to fetch loan details: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (statusCode) => {
    const statusMap = {
      0: "Active",
      1: "Repaid",
      2: "Defaulted",
      3: "Extended",
      4: "Liquidated"
    };
    return statusMap[statusCode] || "Unknown";
  };

  const handleRepayment = async () => {
    if (!window.aptos) {
      setError("Petra wallet not found. Please install Petra wallet.");
      return;
    }

    if (!loanData?.id) {
      setError("No loan ID available for repayment.");
      return;
    }

    setIsPaying(true);
    setError(null);
    setTxHash(null);

    try {
      const isConnected = await window.aptos.isConnected();
      if (!isConnected) {
        await window.aptos.connect();
      }

      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::repay_loan`,
        type_arguments: [],
        arguments: [
          loanData.id.toString(),
          CONTRACT_ADDRESS
        ],
      };

      console.log("Repaying loan with payload:", payload);

      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);

      setTxHash(response.hash);
      
      // Update loan status
      setLoanData(prev => ({ ...prev, status: "Repaid" }));
      
      if (onUpdate) onUpdate();
      
      alert("✅ Loan repaid successfully!");

    } catch (err) {
      console.error("Repayment failed:", err);
      setError(err.message || "Repayment failed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  const handleExtendLoan = async () => {
    if (!window.aptos || !loanData?.id) {
      setError("Wallet not connected or no loan ID available.");
      return;
    }

    setIsExtending(true);
    setError(null);

    try {
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::extend_loan`,
        type_arguments: [],
        arguments: [
          loanData.id.toString(),
          CONTRACT_ADDRESS
        ],
      };

      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);

      setTxHash(response.hash);
      
      // Refresh loan details
      await fetchLoanDetails();
      
      if (onUpdate) onUpdate();
      
      alert("✅ Loan extended successfully!");

    } catch (err) {
      console.error("Extension failed:", err);
      setError(err.message || "Extension failed. Please try again.");
    } finally {
      setIsExtending(false);
    }
  };

  const handleRefinance = async () => {
    if (!window.aptos || !loanData?.id) {
      setError("Wallet not connected or no loan ID available.");
      return;
    }

    setIsRefinancing(true);
    setError(null);

    try {
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::elegent_defi_v2::refinance_loan`,
        type_arguments: [],
        arguments: [
          loanData.id.toString(),
          CONTRACT_ADDRESS
        ],
      };

      const response = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);

      setTxHash(response.hash);
      
      // Refresh loan details
      await fetchLoanDetails();
      
      if (onUpdate) onUpdate();
      
      alert("✅ Loan refinanced successfully!");

    } catch (err) {
      console.error("Refinancing failed:", err);
      setError(err.message || "Refinancing failed. Please try again.");
    } finally {
      setIsRefinancing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-6 shadow-lg shadow-cyan-500/10">
        <div className="text-center text-white/70">
          🔄 Loading loan details...
        </div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-6 shadow-lg shadow-cyan-500/10">
        <div className="text-center text-white/70">
          📋 No loan data available
        </div>
      </div>
    );
  }

  const isActive = loanData.status === "Active";
  const isOverdue = isActive && new Date(loanData.dueDate) < new Date();

  return (
    <div className="w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md p-6 shadow-lg shadow-cyan-500/10 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Loan #{loanData.id}
          </h2>
          <p className="text-white/70 text-sm">{loanData.type}</p>
          {loanId && (
            <button
              onClick={fetchLoanDetails}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline mt-1"
            >
              🔄 Refresh
            </button>
          )}
        </div> 
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${
            loanData.status === 'Active'
              ? isOverdue
                ? 'bg-red-400/10 text-red-400 border-red-400/30'
                : 'bg-green-400/10 text-green-400 border-green-400/30'
              : loanData.status === 'Pending'
              ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30'
              : loanData.status === 'Repaid'
              ? 'bg-blue-400/10 text-blue-300 border-blue-400/30'
              : 'bg-gray-400/10 text-gray-300 border-gray-400/30'
          }`}
        >
          {loanData.status}
          {isOverdue && " (Overdue)"}
        </span>
      </div>

      {/* Principal Amount */}
      <div className="bg-white/5 border border-cyan-400/10 rounded-lg p-4 text-center shadow-inner shadow-cyan-500/5">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
          {loanData.amount}
        </div>
        <p className="text-white/70 text-sm">Principal Amount</p>
        {loanData.interestAmount && (
          <p className="text-yellow-400 text-xs mt-1">
            + {loanData.interestAmount} interest
          </p>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-white/60 text-xs">Interest Rate</p>
          <p className="text-white text-base font-medium">
            {loanData.interestRate}
          </p>
        </div>
        <div>
          <p className="text-white/60 text-xs">Term</p>
          <p className="text-white text-base font-medium">
            {loanData.term}
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="text-sm text-white/80 space-y-2">
        <div className="flex justify-between">
          <span>Total Due:</span>
          <span className="text-white font-semibold">{loanData.remainingBalance}</span>
        </div>
        <div className="flex justify-between">
          <span>Due Date:</span>
          <span className={`font-semibold ${isOverdue ? 'text-red-400' : 'text-white'}`}>
            {loanData.dueDate}
          </span>
        </div>
        {loanData.monthlyPayment && (
          <div className="flex justify-between">
            <span>Payment Amount:</span>
            <span className="text-white font-semibold">{loanData.monthlyPayment}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {isActive && (
          <button 
            onClick={handleRepayment}
            disabled={isPaying}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-2.5 px-4 rounded-lg border border-emerald-400/20 transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPaying ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Processing Payment...
              </span>
            ) : (
              "💳 Repay Loan"
            )}
          </button>
        )}

        {isActive && (
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleExtendLoan}
              disabled={isExtending}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-all disabled:opacity-50"
            >
              {isExtending ? "Extending..." : "⏰ Extend"}
            </button>
            <button 
              onClick={handleRefinance}
              disabled={isRefinancing}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-2 px-3 rounded-lg text-sm transition-all disabled:opacity-50"
            >
              {isRefinancing ? "Refinancing..." : "🔄 Refinance"}
            </button>
          </div>
        )}
      </div>

      {/* Transaction Hash */}
      {txHash && (
        <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
          <p className="text-green-400 text-xs">
            ✅ Transaction successful!{" "}
            <a
              className="underline hover:text-green-300 transition-colors"
              href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Explorer: {txHash.slice(0, 12)}...
            </a>
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-xs">❌ {error}</p>
        </div>
      )}

      {/* Overdue Warning */}
      {isOverdue && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm font-medium">
            ⚠️ This loan is overdue! Please repay as soon as possible to avoid additional penalties.
          </p>
        </div>
      )}
    </div>
  );
};

export default BigLoanCard;