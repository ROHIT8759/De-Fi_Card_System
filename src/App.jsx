// All import statements stay the same
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ErrorBoundary from "./components/ErrorBoundary";

import NavBar from "./components/NavBar";
import LandingNavbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import Features from "./components/landing/Features";
import CTASection from "./components/landing/CTASection";
import Reputation from "./components/landing/Reputation";
import FaucetModule from "./components/landing/FaucetModule";
import BuiltOnAptos from "./components/landing/BuiltOnAptos";
import Footer from "./components/landing/Footer";

import ProfileDashboard from "./components/dashboard/ProfileDashboard";
import PersonalDetails from "./components/dashboard/PersonalDetails";
import BalanceOverview from "./components/dashboard/BalanceOverview";

import Filters from "./components/marketplace/Filters";
import CoinCard from "./components/marketplace/CoinCard";
import AssetTable from "./components/marketplace/AssetTable";
import SummaryHeader from "./components/marketplace/SummaryHeader";
import TradeInterface from "./components/marketplace/TradeInterface";

import SmallLoanCard from "./components/card/SmallLoanCard";
import BigLoanCard from "./components/card/BigLoanCard";
import LoanRequestForm from "./components/card/LoanRequestForm";
import LoanEligibilityMeter from "./components/card/LoanEligibilityMeter";

import WalletConnectionModal from "./components/wallet/WalletConnectionModal";
import {
  getSavedWalletConnection,
  clearSavedWalletConnection,
} from "./components/wallet/walletConfig";

// Constants
const COIN_LIST =
  "bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin";

function App() {
  // Navigation
  const [currentPage, setCurrentPage] = useState("landing");

  // Wallet
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [connectedAt, setConnectedAt] = useState(null);
  const [aptosBalance, setAptosBalance] = useState(0);
  const [useTestnet, setUseTestnet] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Coin data
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [coinsError, setCoinsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [chartRange, setChartRange] = useState("7d");
  const [viewMode, setViewMode] = useState("cards");

  // Other UI
  const [showBorrowPopup, setShowBorrowPopup] = useState(false);

  // Wallet Balance
  const fetchAptosBalance = useCallback(
    async (address) => {
      if (!address) return setAptosBalance(0);

      setIsLoadingBalance(true);
      setBalanceError(null);

      try {
        const url = useTestnet
          ? "https://fullnode.testnet.aptoslabs.com/v1"
          : "https://fullnode.mainnet.aptoslabs.com/v1";

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(`${url}/accounts/${address}/resources`, {
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const coin = data.find(
          (item) =>
            item.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
        );

        const balance = coin?.data?.coin?.value;
        setAptosBalance(balance ? parseInt(balance, 10) / 1e8 : 0);
      } catch (err) {
        setBalanceError(err.message);
        setAptosBalance(0);
      } finally {
        setIsLoadingBalance(false);
      }
    },
    [useTestnet]
  );

  const fetchCoinsData = useCallback(async () => {
    setIsLoadingCoins(true);
    setCoinsError(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: COIN_LIST,
            order: "market_cap_desc",
            sparkline: true,
            price_change_percentage: "1h,24h,7d",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);
      setCoins(data);
      setFilteredCoins(data);
    } catch (err) {
      setCoinsError(err.message || "Failed to fetch coins");
      setCoins([]);
      setFilteredCoins([]);
    } finally {
      setIsLoadingCoins(false);
    }
  }, []);

  // Wallet Handlers
  const handleWalletConnect = useCallback(
    (walletData) => {
      if (walletData?.address) {
        setWalletAddress(walletData.address);
        setWalletType(walletData.walletType || "");
        setConnectedAt(walletData.connectedAt || new Date().toISOString());
        fetchAptosBalance(walletData.address);
      } else {
        handleWalletDisconnect();
      }
      setShowWalletModal(false);
    },
    [fetchAptosBalance]
  );

  const handleWalletDisconnect = useCallback(() => {
    setWalletAddress("");
    setWalletType("");
    setConnectedAt(null);
    setAptosBalance(0);
    clearSavedWalletConnection();
  }, []);

  const handleToggleNetwork = useCallback(() => {
    setUseTestnet((prev) => !prev);
    if (walletAddress) fetchAptosBalance(walletAddress);
  }, [walletAddress, fetchAptosBalance]);

  const handleTrade = (coin, isBuy) => {
    alert(`${isBuy ? "Buying" : "Selling"} ${coin.name} (Coming soon)`);
  };

  // Effects
  useEffect(() => {
    const saved = getSavedWalletConnection();
    if (saved?.address) {
      setWalletAddress(saved.address);
      setWalletType(saved.walletType || "");
      setConnectedAt(saved.connectedAt || new Date().toISOString());
      fetchAptosBalance(saved.address);
    }
  }, [fetchAptosBalance]);

  useEffect(() => {
    if (["marketplace", "dashboard", "cards"].includes(currentPage)) {
      fetchCoinsData();
    }
  }, [currentPage, fetchCoinsData]);

  useEffect(() => {
    let result = [...coins];
    if (searchTerm) {
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    result.sort((a, b) =>
      sortBy === "volume"
        ? b.total_volume - a.total_volume
        : a.market_cap_rank - b.market_cap_rank
    );
    setFilteredCoins(result);
  }, [searchTerm, sortBy, coins]);

  // Memos
  const walletData = useMemo(
    () => ({
      address: walletAddress,
      aptosBalance,
      walletType,
      connectedAt,
      isLoadingBalance,
      balanceError,
    }),
    [
      walletAddress,
      aptosBalance,
      walletType,
      connectedAt,
      isLoadingBalance,
      balanceError,
    ]
  );

  const marketStats = useMemo(() => {
    const marketSize = filteredCoins.reduce(
      (sum, c) => sum + (c.market_cap || 0),
      0
    );
    const totalBorrowed = filteredCoins.reduce(
      (sum, c) => sum + (c.total_volume || 0),
      0
    );
    return {
      marketSize,
      totalBorrowed,
      lentOut: marketSize
        ? ((totalBorrowed / marketSize) * 100).toFixed(2)
        : "0",
    };
  }, [filteredCoins]);

  // Render logic
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="min-h-screen w-full text-white">
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg mt-20">
                <div className="lg:col-span-2 space-y-6">
                  <ProfileDashboard {...walletData} />
                  <PersonalDetails {...walletData} />
                </div>
                <BalanceOverview {...walletData} />
              </div>
            </div>
          </div>
        );
      case "marketplace":
        return (
          <div className="pt-10 max-w-7xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Summary Header */}
              
                <SummaryHeader {...marketStats} />

              {/* Filters */}
              <div>
                <Filters
                  {...{
                    searchTerm,
                    setSearchTerm,
                    sortBy,
                    setSortBy,
                    chartRange,
                    setChartRange,
                  }}
                />
              </div>

              {/* Toggle & Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "cards" ? "table" : "cards")
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded text-white"
                >
                  Toggle View: {viewMode === "cards" ? "Table" : "Cards"}
                </button>
                <button
                  onClick={() => setShowBorrowPopup(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded text-white"
                >
                  Open Borrowing
                </button>
              </div>

              {/* Coin Grid / Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoadingCoins ? (
                  <div className="col-span-full text-center py-10 text-lg text-gray-400">
                    Loading coins...
                  </div>
                ) : coinsError ? (
                  <div className="col-span-full text-center text-red-500">
                    {coinsError}
                  </div>
                ) : viewMode === "cards" ? (
                  filteredCoins.map((coin) => (
                    <CoinCard
                      key={coin.id}
                      coin={coin}
                      chartRange={chartRange}
                      onTrade={handleTrade}
                    />
                  ))
                ) : (
                  <div className="col-span-full">
                    <AssetTable coins={filteredCoins} onTrade={handleTrade} />
                  </div>
                )}
              </div>

              {/* Borrow Modal */}
              {showBorrowPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
                  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl max-w-lg w-full relative overflow-hidden">
                    <button
                      onClick={() => setShowBorrowPopup(false)}
                      className="absolute top-3 right-3 text-white text-2xl hover:text-gray-400"
                    >
                      ✕
                    </button>
                    <TradeInterface />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "cards":
        return (
          <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-white space-y-12">
            <div className="text-center space-y-2 mt-20">
              <h1 className="p-2 text-3xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-blue-400 to-teal-300 bg-clip-text text-transparent drop-shadow-md opacity-90">
                Loan Management
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
                Manage your active loans, request new ones, and track your
                eligibility.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex flex-col gap-6 w-full lg:w-[640px]">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
                  <LoanRequestForm />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
                  <BigLoanCard
                    loan={{
                      id: "001",
                      amount: "$5,000",
                      interestRate: "8.5%",
                      term: "12 months",
                      monthlyPayment: "$456",
                      nextPayment: "Jul 15, 2025",
                      remainingBalance: "$4,200",
                      status: "Active",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full lg:w-[425px]">
                <div className="bg-white/5 border border-white/10 rounded-lg px-8 py-8 shadow-lg">
                  <LoanEligibilityMeter score={75} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg h-[382px]">
                  <div className="flex flex-col space-y-4 h-full">
                    <SmallLoanCard
                      loan={{
                        id: 2,
                        amount: "$500",
                        interest: "4%",
                        dueDate: "Aug 20, 2025",
                        status: "Active",
                      }}
                    />
                    <SmallLoanCard
                      loan={{
                        id: 3,
                        amount: "$1,000",
                        interest: "3%",
                        dueDate: "June 25, 2025",
                        status: "Pending",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <div className="bg-black text-white font-sans relative">
            <main className="overflow-x-hidden">
              <HeroSection
                onNavigateToApp={() => setCurrentPage("marketplace")}
              />
              <div className="bg-grid">
                <Features />
                <Reputation />
                <FaucetModule />
                <BuiltOnAptos />
                <CTASection
                  onNavigateToApp={() => setCurrentPage("marketplace")}
                />
              </div>
            </main>
            <Footer />
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen ${
          ["landing", "cards", "dashboard", "marketplace"].includes(currentPage)
            ? "bg-black text-white"
            : ""
        }`}
      >
        <div className="relative z-20">
          {currentPage === "landing" ? (
            <LandingNavbar
              onNavigateToApp={() => setCurrentPage("marketplace")}
              onWalletConnect={() => setShowWalletModal(true)}
              onWalletDisconnect={handleWalletDisconnect}
              walletAddress={walletAddress}
            />
          ) : (
            <NavBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              walletAddress={walletAddress}
              onWalletConnect={handleWalletConnect}
              useTestnet={useTestnet}
              onToggleNetwork={handleToggleNetwork}
            />
          )}
        </div>
        <main className="relative z-10">{renderPage()}</main>
        {showWalletModal && (
          <WalletConnectionModal
            isOpen={showWalletModal}
            onClose={() => setShowWalletModal(false)}
            onWalletConnect={handleWalletConnect}
            isLandingPage={currentPage === "landing"}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
