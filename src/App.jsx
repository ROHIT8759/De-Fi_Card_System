// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import ErrorBoundary from "./components/ErrorBoundary";

// import NavBar from "./components/NavBar";
// import LandingNavbar from "./components/landing/Navbar";

// import HeroSection from "./components/landing/HeroSection";
// import Features from "./components/landing/Features";
// import CTASection from "./components/landing/CTASection";
// import Reputation from "./components/landing/Reputation";
// import FaucetModule from "./components/landing/FaucetModule";
// import BuiltOnAptos from "./components/landing/BuiltOnAptos";
// import Footer from "./components/landing/Footer";

// import ProfileDashboard from "./components/dashboard/ProfileDashboard";
// import PersonalDetails from "./components/dashboard/PersonalDetails";
// import BalanceOverview from "./components/dashboard/BalanceOverview";

// import Filters from "./components/marketplace/Filters";
// import CoinCard from "./components/marketplace/CoinCard";
// import AssetTable from "./components/marketplace/AssetTable";
// import SummaryHeader from "./components/marketplace/SummaryHeader";
// import TradeInterface from "./components/marketplace/TradeInterface";

// import SmallLoanCard from "./components/card/SmallLoanCard";
// import BigLoanCard from "./components/card/BigLoanCard";
// import LoanRequestForm from "./components/card/LoanRequestForm";
// import LoanEligibilityMeter from "./components/card/LoanEligibilityMeter";

// import WalletConnectionModal from "./components/wallet/WalletConnectionModal";
// import {
//   getSavedWalletConnection,
//   clearSavedWalletConnection,
// } from "./components/wallet/walletConfig";

// function App() {
//   const [currentPage, setCurrentPage] = useState("landing");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [aptosBalance, setAptosBalance] = useState(0);
//   const [walletType, setWalletType] = useState("");
//   const [connectedAt, setConnectedAt] = useState(null);
//   const [showWalletModal, setShowWalletModal] = useState(false);

//   // Load saved wallet on start
//   useEffect(() => {
//     const savedWallet = getSavedWalletConnection();
//     if (savedWallet?.address) {
//       setWalletAddress(savedWallet.address);
//       fetchAptosBalance(savedWallet.address);
//     }
//   }, []);

//   // Fetch APT balance
//   const fetchAptosBalance = async (address) => {
//     try {
//       const res = await fetch(
//         `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}/resources`
//       );
//       const data = await res.json();
//       const coinStore = data.find(
//         (item) =>
//           item.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
//       );
//       const balance = parseInt(coinStore.data.coin.value) / 1e8;
//       setAptosBalance(balance);
//     } catch (err) {
//       console.error("Failed to fetch APT balance:", err);
//     }
//   };

//   const handleWalletConnect = useCallback((walletData) => {
//     if (walletData?.address) {
//       setWalletAddress(walletData.address);
//       setShowWalletModal(false);
//       fetchAptosBalance(walletData.address);
//     } else if (typeof walletData === "string") {
//       setWalletAddress(walletData);
//       fetchAptosBalance(walletData);
//     } else {
//       setWalletAddress("");
//     }
//   }, []);

//   const handleWalletModalOpen = useCallback(() => setShowWalletModal(true), []);
//   const handleWalletDisconnect = useCallback(() => {
//     setWalletAddress("");
//     clearSavedWalletConnection();
//   }, []);

//   // Coin state for marketplace
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("rank");
//   const [chartRange, setChartRange] = useState("7d");
//   const [viewMode, setViewMode] = useState("cards");
//   const [showBorrowPopup, setShowBorrowPopup] = useState(false);
//   const coinList =
//     "bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin";

//   useEffect(() => {
//     if (["marketplace", "dashboard"].includes(currentPage)) {
//       axios
//         .get("https://api.coingecko.com/api/v3/coins/markets", {
//           params: {
//             vs_currency: "usd",
//             ids: coinList,
//             order: "market_cap_desc",
//             sparkline: true,
//             price_change_percentage: "1h,24h,7d",
//           },
//         })
//         .then((res) => {
//           setCoins(res.data);
//           setFilteredCoins(res.data);
//         })
//         .catch((err) => console.error("Failed to fetch coins", err));
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter(
//         (coin) =>
//           coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === "volume") {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = useCallback((coin, isBuy) => {
//     alert(`${isBuy ? "Buying" : "Selling"} ${coin.name} - Coming soon!`);
//   }, []);

//   const mockLoans = [
//     {
//       id: "001",
//       amount: "$5,000",
//       interestRate: "8.5%",
//       term: "12 months",
//       monthlyPayment: "$456",
//       nextPayment: "Jul 15, 2025",
//       remainingBalance: "$4,200",
//       status: "Active",
//     },
//     {
//       id: 2,
//       amount: "$500",
//       interest: "4%",
//       dueDate: "Aug 20, 2025",
//       status: "Active",
//     },
//     {
//       id: 3,
//       amount: "$1,000",
//       interest: "3%",
//       dueDate: "June 25, 2025",
//       status: "Pending",
//     },
//   ];

//   const marketStats = useMemo(() => {
//     const marketSize = filteredCoins.reduce(
//       (sum, coin) => sum + (coin.market_cap || 0),
//       0
//     );
//     const totalBorrowed = filteredCoins.reduce(
//       (sum, coin) => sum + (coin.total_volume || 0),
//       0
//     );
//     const lentOut =
//       marketSize > 0 ? ((totalBorrowed / marketSize) * 100).toFixed(2) : 0;
//     return { marketSize, totalBorrowed, lentOut };
//   }, [filteredCoins]);

//   // Define walletData after all state variables
//   const walletData = {
//     address: walletAddress,
//     aptosBalance,
//     walletType,
//     connectedAt,
//   };

//   const renderPage = () => {
//     if (currentPage === "dashboard") {
//       return (
//         <div className="min-h-screen w-full text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
//               <div className="lg:col-span-2 space-y-6">
//                 <ProfileDashboard
//                   walletAddress={walletAddress}
//                   aptosBalance={aptosBalance}
//                 />
//                 <PersonalDetails
//                   walletAddress={walletAddress}
//                   aptosBalance={aptosBalance}
//                 />
//               </div>
//               <div className="space-y-6">
//                 <BalanceOverview />
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     switch (currentPage) {
//       case "landing":
//         return (
//           <div className="bg-black text-white font-sans relative">
//             <main className="overflow-x-hidden">
//               <HeroSection
//                 onNavigateToApp={() => setCurrentPage("marketplace")}
//               />
//               <div className="bg-grid">
//                 <Features />
//                 <Reputation />
//                 <FaucetModule />
//                 <BuiltOnAptos />
//                 <CTASection
//                   onNavigateToApp={() => setCurrentPage("marketplace")}
//                 />
//               </div>
//             </main>
//             <Footer />
//           </div>
//         );

//       case "marketplace":
//         return (
//           <div className=" pt-10 relative max-w-7xl mx-auto space-y-6">
//             {/* Summary Header */}
//             <SummaryHeader
//               marketSize={marketStats.marketSize}
//               totalBorrowed={marketStats.totalBorrowed}
//               lentOut={marketStats.lentOut}
//             />

//             {/* Filters + Toggle */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <Filters
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 sortBy={sortBy}
//                 setSortBy={setSortBy}
//                 chartRange={chartRange}
//                 setChartRange={setChartRange}
//               />

//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     setViewMode(viewMode === "cards" ? "table" : "cards")
//                   }
//                   className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
//                 >
//                   Toggle View: {viewMode === "cards" ? "Table" : "Cards"}
//                 </button>

//                 <button
//                   onClick={() => setShowBorrowPopup(true)}
//                   className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
//                 >
//                   Open Borrowing
//                 </button>
//               </div>
//             </div>

//             {/* Coin View */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg pb-12">
//               {filteredCoins.length > 0 ? (
//                 viewMode === "cards" ? (
//                   <>
//                     {filteredCoins.slice(0, 6).map((coin) => (
//                       <CoinCard
//                         key={coin.id}
//                         coin={coin}
//                         chartRange={chartRange}
//                         onTrade={handleTrade}
//                       />
//                     ))}
//                   </>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <AssetTable
//                       coins={filteredCoins.slice(0, 10)}
//                       onTrade={handleTrade}
//                     />
//                   </div>
//                 )
//               ) : (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
//                   <p>Loading coin data...</p>
//                 </div>
//               )}
//             </div>

//             {/* Borrowing Popup Modal */}
//             {showBorrowPopup && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//                 <div className="bg-white dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-2xl max-w-lg w-full relative">
//                   <button
//                     onClick={() => setShowBorrowPopup(false)}
//                     className="absolute top-3 right-3 text-gray-500 hover:text-white"
//                   >
//                     ✕
//                   </button>
//                   <TradeInterface />
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       case "cards":
//         return (
//           <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-white space-y-12">
//             {/* 💳 Header */}
//             <div className="text-center space-y-2">
//               <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-blue-400 to-teal-300 bg-clip-text text-transparent drop-shadow-md opacity-90">
//                 Loan Management
//               </h1>
//               <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
//                 Manage your active loans, request new ones, and track your
//                 eligibility.
//               </p>
//             </div>

//             <div className="w-full flex justify-center items-start gap-10 px-4">
//               {/* LEFT COLUMN: Request Form + Big Loan Card */}
//               <div className="flex flex-col gap-6 w-[640px]">
//                 <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
//                   <LoanRequestForm />
//                 </div>
//                 <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
//                   <BigLoanCard loan={mockLoans[0]} />
//                 </div>
//               </div>

//               {/* RIGHT COLUMN: Eligibility Meter + Small Loan Cards */}
//               <div className="flex flex-col gap-6 w-[425px]">
//                 <div className="bg-white/5 border border-white/10 rounded-lg px-8 py-8 shadow-lg">
//                   <LoanEligibilityMeter score={75} />
//                 </div>
//                 <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg h-[382px]">
//                   <div className="flex flex-col space-y-4 h-full">
//                     <SmallLoanCard loan={mockLoans[1]} />
//                     <SmallLoanCard loan={mockLoans[2]} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         );

//       default:
//         return (
//           <div className="max-w-7xl mx-auto px-4 text-center py-20">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               Page Not Found
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               The page you're looking for doesn't exist.
//             </p>
//           </div>
//         );
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div
//         className={`w-full min-h-screen relative ${
//           ["landing", "cards", "dashboard", "marketplace"].includes(currentPage)
//             ? "bg-black text-white bg-grid"
//             : "bg-gray-900 text-white"
//         }`}
//       >
//         <div className="relative z-20 w-full">
//           {currentPage === "landing" ? (
//             <LandingNavbar
//               onNavigateToApp={() => setCurrentPage("marketplace")}
//               onWalletConnect={handleWalletModalOpen}
//               onWalletDisconnect={handleWalletDisconnect}
//               walletAddress={walletAddress}
//             />
//           ) : (
//             <NavBar
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//               walletAddress={walletAddress}
//               onWalletConnect={handleWalletConnect}
//               useTestnet={useTestnet}
//               onToggleNetwork={handleToggleNetwork}
//             />
//           )}
//         </div>

//         <main
//           className={`relative z-10 w-full min-h-screen ${
//             currentPage !== "landing" ? "pt-16 md:pt-20" : ""
//           }`}
//         >
//           <div className="w-full px-4 sm:px-6 lg:px-8">{renderPage()}</div>
//         </main>

//         {showWalletModal && (
//           <WalletConnectionModal
//             isOpen={showWalletModal}
//             onClose={() => setShowWalletModal(false)}
//             onWalletConnect={handleWalletConnect}
//             isLandingPage={currentPage === "landing"}
//           />
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;




/////////Working Code

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import ErrorBoundary from "./components/ErrorBoundary";

// import NavBar from "./components/NavBar";
// import LandingNavbar from "./components/landing/Navbar";

// import HeroSection from "./components/landing/HeroSection";
// import Features from "./components/landing/Features";
// import CTASection from "./components/landing/CTASection";
// import Reputation from "./components/landing/Reputation";
// import FaucetModule from "./components/landing/FaucetModule";
// import BuiltOnAptos from "./components/landing/BuiltOnAptos";
// import Footer from "./components/landing/Footer";

// import ProfileDashboard from "./components/dashboard/ProfileDashboard";
// import PersonalDetails from "./components/dashboard/PersonalDetails";
// import BalanceOverview from "./components/dashboard/BalanceOverview";

// import Filters from "./components/marketplace/Filters";
// import CoinCard from "./components/marketplace/CoinCard";
// import AssetTable from "./components/marketplace/AssetTable";
// import SummaryHeader from "./components/marketplace/SummaryHeader";
// import TradeInterface from "./components/marketplace/TradeInterface";

// import SmallLoanCard from "./components/card/SmallLoanCard";
// import BigLoanCard from "./components/card/BigLoanCard";
// import LoanRequestForm from "./components/card/LoanRequestForm";
// import LoanEligibilityMeter from "./components/card/LoanEligibilityMeter";

// import WalletConnectionModal from "./components/wallet/WalletConnectionModal";
// import {
//   getSavedWalletConnection,
//   clearSavedWalletConnection,
// } from "./components/wallet/walletConfig";

// function App() {
//   const [currentPage, setCurrentPage] = useState("landing");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [aptosBalance, setAptosBalance] = useState(0);
//   const [walletType, setWalletType] = useState("");
//   const [connectedAt, setConnectedAt] = useState(null);
//   const [showWalletModal, setShowWalletModal] = useState(false);
  
//   // Add missing state variables
//   const [useTestnet, setUseTestnet] = useState(false);

//   // Load saved wallet on start
//   useEffect(() => {
//     const savedWallet = getSavedWalletConnection();
//     if (savedWallet?.address) {
//       setWalletAddress(savedWallet.address);
//       setWalletType(savedWallet.walletType || "");
//       setConnectedAt(savedWallet.connectedAt || new Date().toISOString());
//       fetchAptosBalance(savedWallet.address);
//     }
//   }, []);

//   // Fetch APT balance
//   const fetchAptosBalance = async (address) => {
//     try {
//       const networkUrl = useTestnet 
//         ? "https://fullnode.testnet.aptoslabs.com/v1"
//         : "https://fullnode.mainnet.aptoslabs.com/v1";
      
//       const res = await fetch(`${networkUrl}/accounts/${address}/resources`);
//       const data = await res.json();
//       const coinStore = data.find(
//         (item) =>
//           item.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
//       );
      
//       if (coinStore) {
//         const balance = parseInt(coinStore.data.coin.value) / 1e8;
//         setAptosBalance(balance);
//       }
//     } catch (err) {
//       console.error("Failed to fetch APT balance:", err);
//       setAptosBalance(0);
//     }
//   };

//   const handleWalletConnect = useCallback((walletData) => {
//     console.log("handleWalletConnect called with:", walletData);
    
//     if (walletData?.address) {
//       setWalletAddress(walletData.address);
//       setWalletType(walletData.walletType || "");
//       setConnectedAt(walletData.connectedAt || new Date().toISOString());
//       setShowWalletModal(false);
//       fetchAptosBalance(walletData.address);
//     } else if (typeof walletData === "string" && walletData) {
//       setWalletAddress(walletData);
//       setConnectedAt(new Date().toISOString());
//       fetchAptosBalance(walletData);
//     } else {
//       // Disconnect wallet
//       setWalletAddress("");
//       setWalletType("");
//       setConnectedAt(null);
//       setAptosBalance(0);
//       clearSavedWalletConnection();
//     }
//   }, [useTestnet]);

//   const handleWalletModalOpen = useCallback(() => setShowWalletModal(true), []);
  
//   const handleWalletDisconnect = useCallback(() => {
//     setWalletAddress("");
//     setWalletType("");
//     setConnectedAt(null);
//     setAptosBalance(0);
//     clearSavedWalletConnection();
//   }, []);

//   // Add missing handler for network toggle
//   const handleToggleNetwork = useCallback(() => {
//     setUseTestnet(prev => !prev);
//     // Refetch balance with new network if wallet is connected
//     if (walletAddress) {
//       fetchAptosBalance(walletAddress);
//     }
//   }, [walletAddress]);

//   // Coin state for marketplace
//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("rank");
//   const [chartRange, setChartRange] = useState("7d");
//   const [viewMode, setViewMode] = useState("cards");
//   const [showBorrowPopup, setShowBorrowPopup] = useState(false);
  
//   const coinList =
//     "bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin";

//   useEffect(() => {
//     if (["marketplace", "dashboard"].includes(currentPage)) {
//       axios
//         .get("https://api.coingecko.com/api/v3/coins/markets", {
//           params: {
//             vs_currency: "usd",
//             ids: coinList,
//             order: "market_cap_desc",
//             sparkline: true,
//             price_change_percentage: "1h,24h,7d",
//           },
//         })
//         .then((res) => {
//           setCoins(res.data);
//           setFilteredCoins(res.data);
//         })
//         .catch((err) => console.error("Failed to fetch coins", err));
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     let data = [...coins];
//     if (searchTerm) {
//       data = data.filter(
//         (coin) =>
//           coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === "volume") {
//       data.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(data);
//   }, [searchTerm, sortBy, coins]);

//   const handleTrade = useCallback((coin, isBuy) => {
//     alert(`${isBuy ? "Buying" : "Selling"} ${coin.name} - Coming soon!`);
//   }, []);

//   const mockLoans = [
//     {
//       id: "001",
//       amount: "$5,000",
//       interestRate: "8.5%",
//       term: "12 months",
//       monthlyPayment: "$456",
//       nextPayment: "Jul 15, 2025",
//       remainingBalance: "$4,200",
//       status: "Active",
//     },
//     {
//       id: 2,
//       amount: "$500",
//       interest: "4%",
//       dueDate: "Aug 20, 2025",
//       status: "Active",
//     },
//     {
//       id: 3,
//       amount: "$1,000",
//       interest: "3%",
//       dueDate: "June 25, 2025",
//       status: "Pending",
//     },
//   ];

//   const marketStats = useMemo(() => {
//     const marketSize = filteredCoins.reduce(
//       (sum, coin) => sum + (coin.market_cap || 0),
//       0
//     );
//     const totalBorrowed = filteredCoins.reduce(
//       (sum, coin) => sum + (coin.total_volume || 0),
//       0
//     );
//     const lentOut =
//       marketSize > 0 ? ((totalBorrowed / marketSize) * 100).toFixed(2) : 0;
//     return { marketSize, totalBorrowed, lentOut };
//   }, [filteredCoins]);

//   // Define walletData object - Updated to use the new format
//   const walletData = {
//     address: walletAddress,
//     aptosBalance,
//     walletType,
//     connectedAt,
//   };

//   const renderPage = () => {
//     if (currentPage === "dashboard") {
//       return (
//         <div className="min-h-screen w-full text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
//               <div className="lg:col-span-2 space-y-6">
//                 <ProfileDashboard
//                   walletAddress={walletAddress}
//                   aptosBalance={aptosBalance}
//                 />
//                 {/* Updated PersonalDetails to use walletData */}
//                 <PersonalDetails walletData={walletData} />
//               </div>
//               <div className="space-y-6">
//                 <BalanceOverview />
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     switch (currentPage) {
//       case "landing":
//         return (
//           <div className="bg-black text-white font-sans relative">
//             <main className="overflow-x-hidden">
//               <HeroSection
//                 onNavigateToApp={() => setCurrentPage("marketplace")}
//               />
//               <div className="bg-grid">
//                 <Features />
//                 <Reputation />
//                 <FaucetModule />
//                 <BuiltOnAptos />
//                 <CTASection
//                   onNavigateToApp={() => setCurrentPage("marketplace")}
//                 />
//               </div>
//             </main>
//             <Footer />
//           </div>
//         );

//       case "marketplace":
//         return (
//           <div className="pt-10 relative max-w-7xl mx-auto space-y-6">
//             {/* Summary Header */}
//             <SummaryHeader
//               marketSize={marketStats.marketSize}
//               totalBorrowed={marketStats.totalBorrowed}
//               lentOut={marketStats.lentOut}
//             />

//             {/* Filters + Toggle */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <Filters
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 sortBy={sortBy}
//                 setSortBy={setSortBy}
//                 chartRange={chartRange}
//                 setChartRange={setChartRange}
//               />

//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     setViewMode(viewMode === "cards" ? "table" : "cards")
//                   }
//                   className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
//                 >
//                   Toggle View: {viewMode === "cards" ? "Table" : "Cards"}
//                 </button>

//                 <button
//                   onClick={() => setShowBorrowPopup(true)}
//                   className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
//                 >
//                   Open Borrowing
//                 </button>
//               </div>
//             </div>

//             {/* Coin View */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg pb-12">
//               {filteredCoins.length > 0 ? (
//                 viewMode === "cards" ? (
//                   <>
//                     {filteredCoins.slice(0, 6).map((coin) => (
//                       <CoinCard
//                         key={coin.id}
//                         coin={coin}
//                         chartRange={chartRange}
//                         onTrade={handleTrade}
//                       />
//                     ))}
//                   </>
//                 ) : (
//                   <div className="col-span-full overflow-x-auto">
//                     <AssetTable
//                       coins={filteredCoins.slice(0, 10)}
//                       onTrade={handleTrade}
//                     />
//                   </div>
//                 )
//               ) : (
//                 <div className="col-span-full text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
//                   <p>Loading coin data...</p>
//                 </div>
//               )}
//             </div>

//             {/* Borrowing Popup Modal */}
//             {showBorrowPopup && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//                 <div className="bg-white dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-2xl max-w-lg w-full relative">
//                   <button
//                     onClick={() => setShowBorrowPopup(false)}
//                     className="absolute top-3 right-3 text-gray-500 hover:text-white"
//                   >
//                     ✕
//                   </button>
//                   <TradeInterface />
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       case "cards":
//         return (
//           <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-white space-y-12">
//             {/* Header */}
//             <div className="text-center space-y-2">
//               <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-blue-400 to-teal-300 bg-clip-text text-transparent drop-shadow-md opacity-90">
//                 Loan Management
//               </h1>
//               <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
//                 Manage your active loans, request new ones, and track your
//                 eligibility.
//               </p>
//             </div>

//             <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-10 px-4">
//               {/* LEFT COLUMN: Request Form + Big Loan Card */}
//               <div className="flex flex-col gap-6 w-full lg:w-[640px]">
//                 <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
//                   <LoanRequestForm />
//                 </div>
//                 <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
//                   <BigLoanCard loan={mockLoans[0]} />
//                 </div>
//               </div>

//               {/* RIGHT COLUMN: Eligibility Meter + Small Loan Cards */}
//               <div className="flex flex-col gap-6 w-full lg:w-[425px]">
//                 <div className="bg-white/5 border border-white/10 rounded-lg px-8 py-8 shadow-lg">
//                   <LoanEligibilityMeter score={75} />
//                 </div>
//                 <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg h-[382px]">
//                   <div className="flex flex-col space-y-4 h-full">
//                     <SmallLoanCard loan={mockLoans[1]} />
//                     <SmallLoanCard loan={mockLoans[2]} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         );

//       default:
//         return (
//           <div className="max-w-7xl mx-auto px-4 text-center py-20">
//             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               Page Not Found
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               The page you're looking for doesn't exist.
//             </p>
//           </div>
//         );
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div
//         className={`w-full min-h-screen relative ${
//           ["landing", "cards", "dashboard", "marketplace"].includes(currentPage)
//             ? "bg-black text-white bg-grid"
//             : "bg-gray-900 text-white"
//         }`}
//       >
//         <div className="relative z-20 w-full">
//           {currentPage === "landing" ? (
//             <LandingNavbar
//               onNavigateToApp={() => setCurrentPage("marketplace")}
//               onWalletConnect={handleWalletModalOpen}
//               onWalletDisconnect={handleWalletDisconnect}
//               walletAddress={walletAddress}
//             />
//           ) : (
//             <NavBar
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//               walletAddress={walletAddress}
//               onWalletConnect={handleWalletConnect}
//               useTestnet={useTestnet}
//               onToggleNetwork={handleToggleNetwork}
//             />
//           )}
//         </div>

//         <main
//           className={`relative z-10 w-full min-h-screen ${
//             currentPage !== "landing" ? "pt-16 md:pt-20" : ""
//           }`}
//         >
//           <div className="w-full px-4 sm:px-6 lg:px-8">{renderPage()}</div>
//         </main>

//         {showWalletModal && (
//           <WalletConnectionModal
//             isOpen={showWalletModal}
//             onClose={() => setShowWalletModal(false)}
//             onWalletConnect={handleWalletConnect}
//             isLandingPage={currentPage === "landing"}
//           />
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;


// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import ErrorBoundary from "./components/ErrorBoundary";

// import NavBar from "./components/NavBar";
// import LandingNavbar from "./components/landing/Navbar";
// import HeroSection from "./components/landing/HeroSection";
// import Features from "./components/landing/Features";
// import CTASection from "./components/landing/CTASection";
// import Reputation from "./components/landing/Reputation";
// import FaucetModule from "./components/landing/FaucetModule";
// import BuiltOnAptos from "./components/landing/BuiltOnAptos";
// import Footer from "./components/landing/Footer";

// import ProfileDashboard from "./components/dashboard/ProfileDashboard";
// import PersonalDetails from "./components/dashboard/PersonalDetails";
// import BalanceOverview from "./components/dashboard/BalanceOverview";

// import Filters from "./components/marketplace/Filters";
// import CoinCard from "./components/marketplace/CoinCard";
// import AssetTable from "./components/marketplace/AssetTable";
// import SummaryHeader from "./components/marketplace/SummaryHeader";
// import TradeInterface from "./components/marketplace/TradeInterface";

// import SmallLoanCard from "./components/card/SmallLoanCard";
// import BigLoanCard from "./components/card/BigLoanCard";
// import LoanRequestForm from "./components/card/LoanRequestForm";
// import LoanEligibilityMeter from "./components/card/LoanEligibilityMeter";

// import WalletConnectionModal from "./components/wallet/WalletConnectionModal";
// import {
//   getSavedWalletConnection,
//   clearSavedWalletConnection,
// } from "./components/wallet/walletConfig";

// function App() {
//   const [currentPage, setCurrentPage] = useState("landing");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [aptosBalance, setAptosBalance] = useState(0);
//   const [walletType, setWalletType] = useState("");
//   const [connectedAt, setConnectedAt] = useState(null);
//   const [showWalletModal, setShowWalletModal] = useState(false);
//   const [useTestnet, setUseTestnet] = useState(false);
//   const [isLoadingBalance, setIsLoadingBalance] = useState(false);
//   const [balanceError, setBalanceError] = useState(null);

//   const [coins, setCoins] = useState([]);
//   const [filteredCoins, setFilteredCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("rank");
//   const [chartRange, setChartRange] = useState("7d");
//   const [viewMode, setViewMode] = useState("cards");
//   const [showBorrowPopup, setShowBorrowPopup] = useState(false);
//   const [isLoadingCoins, setIsLoadingCoins] = useState(false);
//   const [coinsError, setCoinsError] = useState(null);

//   const coinList =
//     "bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin";

//   const fetchAptosBalance = useCallback(async (address) => {
//     if (!address) return setAptosBalance(0);

//     setIsLoadingBalance(true);
//     setBalanceError(null);

//     try {
//       const url = useTestnet
//         ? "https://fullnode.testnet.aptoslabs.com/v1"
//         : "https://fullnode.mainnet.aptoslabs.com/v1";

//       const controller = new AbortController();
//       const timeout = setTimeout(() => controller.abort(), 10000);

//       const res = await fetch(`${url}/accounts/${address}/resources`, {
//         signal: controller.signal,
//       });
//       clearTimeout(timeout);

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       const coin = data.find(
//         (item) =>
//           item.type ===
//           "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
//       );
//       const balance = coin?.data?.coin?.value;
//       setAptosBalance(balance ? parseInt(balance, 10) / 1e8 : 0);
//     } catch (err) {
//       setBalanceError(err.message);
//       setAptosBalance(0);
//     } finally {
//       setIsLoadingBalance(false);
//     }
//   }, [useTestnet]);

//   const handleWalletConnect = useCallback((walletData) => {
//     if (walletData?.address) {
//       setWalletAddress(walletData.address);
//       setWalletType(walletData.walletType || "");
//       setConnectedAt(walletData.connectedAt || new Date().toISOString());
//       setShowWalletModal(false);
//       fetchAptosBalance(walletData.address);
//     } else {
//       setWalletAddress("");
//       setWalletType("");
//       setConnectedAt(null);
//       setAptosBalance(0);
//       clearSavedWalletConnection();
//     }
//   }, [fetchAptosBalance]);

//   const handleWalletDisconnect = useCallback(() => {
//     setWalletAddress("");
//     setWalletType("");
//     setConnectedAt(null);
//     setAptosBalance(0);
//     clearSavedWalletConnection();
//   }, []);

//   const handleToggleNetwork = useCallback(() => {
//     setUseTestnet((prev) => !prev);
//     if (walletAddress) fetchAptosBalance(walletAddress);
//   }, [walletAddress, fetchAptosBalance]);

//   const fetchCoinsData = useCallback(async () => {
//     setIsLoadingCoins(true);
//     setCoinsError(null);

//     try {
//       const controller = new AbortController();
//       const timeout = setTimeout(() => controller.abort(), 10000);

//       const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
//         params: {
//           vs_currency: "usd",
//           ids: coinList,
//           order: "market_cap_desc",
//           sparkline: true,
//           price_change_percentage: "1h,24h,7d",
//         },
//         signal: controller.signal,
//       });

//       clearTimeout(timeout);
//       setCoins(res.data);
//       setFilteredCoins(res.data);
//     } catch (err) {
//       setCoinsError(err.message || "Failed to fetch coins");
//       setCoins([]);
//       setFilteredCoins([]);
//     } finally {
//       setIsLoadingCoins(false);
//     }
//   }, []);

//   useEffect(() => {
//     const saved = getSavedWalletConnection();
//     if (saved?.address) {
//       setWalletAddress(saved.address);
//       setWalletType(saved.walletType || "");
//       setConnectedAt(saved.connectedAt || new Date().toISOString());
//       fetchAptosBalance(saved.address);
//     }
//   }, [fetchAptosBalance]);

//   useEffect(() => {
//     if (["marketplace", "dashboard"].includes(currentPage)) {
//       fetchCoinsData();
//     }
//   }, [currentPage, fetchCoinsData]);

//   useEffect(() => {
//     let result = [...coins];
//     if (searchTerm) {
//       result = result.filter(
//         (coin) =>
//           coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (sortBy === "volume") {
//       result.sort((a, b) => b.total_volume - a.total_volume);
//     } else {
//       result.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
//     }
//     setFilteredCoins(result);
//   }, [searchTerm, sortBy, coins]);

//   const walletData = useMemo(() => ({
//     address: walletAddress,
//     aptosBalance,
//     walletType,
//     connectedAt,
//     isLoadingBalance,
//     balanceError,
//   }), [walletAddress, aptosBalance, walletType, connectedAt, isLoadingBalance, balanceError]);

//   const marketStats = useMemo(() => {
//     const marketSize = filteredCoins.reduce((sum, c) => sum + (c.market_cap || 0), 0);
//     const totalBorrowed = filteredCoins.reduce((sum, c) => sum + (c.total_volume || 0), 0);
//     return {
//       marketSize,
//       totalBorrowed,
//       lentOut: marketSize > 0 ? ((totalBorrowed / marketSize) * 100).toFixed(2) : "0",
//     };
//   }, [filteredCoins]);

//   const handleTrade = (coin, isBuy) => {
//     alert(`${isBuy ? "Buying" : "Selling"} ${coin.name} (Coming soon)`);
//   };

//   const renderPage = () => {
//     if (currentPage === "dashboard") {
//       return (
//         <div className="min-h-screen w-full text-white">
//           <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg">
//               <div className="lg:col-span-2 space-y-6">
//                 <ProfileDashboard {...walletData} />
//                 <PersonalDetails {...walletData} />
//               </div>
//               <div>
//                 <BalanceOverview {...walletData} />
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     if (currentPage === "marketplace") {
//       return (
//         <div className="pt-10 max-w-7xl mx-auto space-y-6">
//           <SummaryHeader {...marketStats} />
//           <Filters {...{ searchTerm, setSearchTerm, sortBy, setSortBy, chartRange, setChartRange }} />
//           <div className="flex justify-between gap-4">
//             <button
//               onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
//               className="bg-indigo-600 px-4 py-2 rounded text-white"
//             >
//               Toggle View: {viewMode === "cards" ? "Table" : "Cards"}
//             </button>
//             <button
//               onClick={() => setShowBorrowPopup(true)}
//               className="bg-emerald-600 px-4 py-2 rounded text-white"
//             >
//               Open Borrowing
//             </button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {isLoadingCoins ? (
//               <div className="col-span-full text-center py-10">Loading coins...</div>
//             ) : coinsError ? (
//               <div className="col-span-full text-center text-red-500">{coinsError}</div>
//             ) : viewMode === "cards" ? (
//               filteredCoins.map((coin) => (
//                 <CoinCard key={coin.id} coin={coin} chartRange={chartRange} onTrade={handleTrade} />
//               ))
//             ) : (
//               <AssetTable coins={filteredCoins} onTrade={handleTrade} />
//             )}
//           </div>

//           {showBorrowPopup && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//               <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl max-w-lg w-full relative">
//                 <button onClick={() => setShowBorrowPopup(false)} className="absolute top-3 right-3 text-white">✕</button>
//                 <TradeInterface />
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     }

//     return (
//       <div className="bg-black text-white font-sans relative">
//         <main className="overflow-x-hidden">
//           <HeroSection onNavigateToApp={() => setCurrentPage("marketplace")} />
//           <div className="bg-grid">
//             <Features />
//             <Reputation />
//             <FaucetModule />
//             <BuiltOnAptos />
//             <CTASection onNavigateToApp={() => setCurrentPage("marketplace")} />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   };

//   return (
//     <ErrorBoundary>
//       <div className={`min-h-screen ${currentPage === "landing" ? "" : "bg-black text-white"}`}>
//         <div className="relative z-20">
//           {currentPage === "landing" ? (
//             <LandingNavbar
//               onNavigateToApp={() => setCurrentPage("marketplace")}
//               onWalletConnect={() => setShowWalletModal(true)}
//               onWalletDisconnect={handleWalletDisconnect}
//               walletAddress={walletAddress}
//             />
//           ) : (
//             <NavBar
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//               walletAddress={walletAddress}
//               onWalletConnect={handleWalletConnect}
//               useTestnet={useTestnet}
//               onToggleNetwork={handleToggleNetwork}
//             />
//           )}
//         </div>

//         <main className="relative z-10">{renderPage()}</main>

//         {showWalletModal && (
//           <WalletConnectionModal
//             isOpen={showWalletModal}
//             onClose={() => setShowWalletModal(false)}
//             onWalletConnect={handleWalletConnect}
//             isLandingPage={currentPage === "landing"}
//           />
//         )}
//       </div>
//     </ErrorBoundary>
//   );
// }

// export default App;





// All import statements stay the same
import React, { useState, useEffect, useMemo, useCallback } from "react";
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

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [walletAddress, setWalletAddress] = useState("");
  const [aptosBalance, setAptosBalance] = useState(0);
  const [walletType, setWalletType] = useState("");
  const [connectedAt, setConnectedAt] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [useTestnet, setUseTestnet] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [balanceError, setBalanceError] = useState(null);

  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [chartRange, setChartRange] = useState("7d");
  const [viewMode, setViewMode] = useState("cards");
  const [showBorrowPopup, setShowBorrowPopup] = useState(false);
  const [isLoadingCoins, setIsLoadingCoins] = useState(false);
  const [coinsError, setCoinsError] = useState(null);

  const coinList =
    "bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin";

  const fetchAptosBalance = useCallback(async (address) => {
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
          item.type ===
          "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
      );
      const balance = coin?.data?.coin?.value;
      setAptosBalance(balance ? parseInt(balance, 10) / 1e8 : 0);
    } catch (err) {
      setBalanceError(err.message);
      setAptosBalance(0);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [useTestnet]);

  const handleWalletConnect = useCallback((walletData) => {
    if (walletData?.address) {
      setWalletAddress(walletData.address);
      setWalletType(walletData.walletType || "");
      setConnectedAt(walletData.connectedAt || new Date().toISOString());
      setShowWalletModal(false);
      fetchAptosBalance(walletData.address);
    } else {
      setWalletAddress("");
      setWalletType("");
      setConnectedAt(null);
      setAptosBalance(0);
      clearSavedWalletConnection();
    }
  }, [fetchAptosBalance]);

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

  const fetchCoinsData = useCallback(async () => {
    setIsLoadingCoins(true);
    setCoinsError(null);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: coinList,
          order: "market_cap_desc",
          sparkline: true,
          price_change_percentage: "1h,24h,7d",
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);
      setCoins(res.data);
      setFilteredCoins(res.data);
    } catch (err) {
      setCoinsError(err.message || "Failed to fetch coins");
      setCoins([]);
      setFilteredCoins([]);
    } finally {
      setIsLoadingCoins(false);
    }
  }, []);

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
    if (sortBy === "volume") {
      result.sort((a, b) => b.total_volume - a.total_volume);
    } else {
      result.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
    }
    setFilteredCoins(result);
  }, [searchTerm, sortBy, coins]);

  const walletData = useMemo(() => ({
    address: walletAddress,
    aptosBalance,
    walletType,
    connectedAt,
    isLoadingBalance,
    balanceError,
  }), [walletAddress, aptosBalance, walletType, connectedAt, isLoadingBalance, balanceError]);

  const marketStats = useMemo(() => {
    const marketSize = filteredCoins.reduce((sum, c) => sum + (c.market_cap || 0), 0);
    const totalBorrowed = filteredCoins.reduce((sum, c) => sum + (c.total_volume || 0), 0);
    return {
      marketSize,
      totalBorrowed,
      lentOut: marketSize > 0 ? ((totalBorrowed / marketSize) * 100).toFixed(2) : "0",
    };
  }, [filteredCoins]);

  const handleTrade = (coin, isBuy) => {
    alert(`${isBuy ? "Buying" : "Selling"} ${coin.name} (Coming soon)`);
  };

  const renderPage = () => {
    if (currentPage === "dashboard") {
      return (
        <div className="min-h-screen w-full text-white">
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 shadow-lg">
              <div className="lg:col-span-2 space-y-6">
                <ProfileDashboard {...walletData} />
                <PersonalDetails {...walletData} />
              </div>
              <div>
                <BalanceOverview {...walletData} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === "marketplace") {
      return (
        <div className="pt-10 max-w-7xl mx-auto space-y-6">
          <SummaryHeader {...marketStats} />
          <Filters {...{ searchTerm, setSearchTerm, sortBy, setSortBy, chartRange, setChartRange }} />
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
              className="bg-indigo-600 px-4 py-2 rounded text-white"
            >
              Toggle View: {viewMode === "cards" ? "Table" : "Cards"}
            </button>
            <button
              onClick={() => setShowBorrowPopup(true)}
              className="bg-emerald-600 px-4 py-2 rounded text-white"
            >
              Open Borrowing
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {isLoadingCoins ? (
              <div className="col-span-full text-center py-10">Loading coins...</div>
            ) : coinsError ? (
              <div className="col-span-full text-center text-red-500">{coinsError}</div>
            ) : viewMode === "cards" ? (
              filteredCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} chartRange={chartRange} onTrade={handleTrade} />
              ))
            ) : (
              <AssetTable coins={filteredCoins} onTrade={handleTrade} />
            )}
          </div>

            {/* Borrowing Popup Modal */}
            {showBorrowPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-2xl max-w-lg w-full relative">
                  <button
                    onClick={() => setShowBorrowPopup(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-white"
                  >
                    ✕
                  </button>
                  <TradeInterface />
                </div>
              </div>
            )}
          </div>
        );



      case 'dashboard':
        return (
          <div className="min-h-screen w-full text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
                <div className="lg:col-span-2 space-y-6">
                  <ProfileDashboard />
                  <PersonalDetails />
                </div>
                <div className="space-y-6">
                  <BalanceOverview />
                </div>
              </div>
            </div>
          </div>
        );


      case 'cards':
        return (
          <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-white space-y-12">
            {/* 💳 Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-blue-400 to-teal-300 bg-clip-text text-transparent drop-shadow-md opacity-90">
                Loan Management
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
                Manage your active loans, request new ones, and track your eligibility.
              </p>
            </div>

          <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-10 px-4">
            <div className="flex flex-col gap-6 w-full lg:w-[640px]">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
                <LoanRequestForm />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
                <BigLoanCard loan={{
                  id: "001",
                  amount: "$5,000",
                  interestRate: "8.5%",
                  term: "12 months",
                  monthlyPayment: "$456",
                  nextPayment: "Jul 15, 2025",
                  remainingBalance: "$4,200",
                  status: "Active",
                }} />
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-[425px]">
              <div className="bg-white/5 border border-white/10 rounded-lg px-8 py-8 shadow-lg">
                <LoanEligibilityMeter score={75} />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg h-[382px]">
                <div className="flex flex-col space-y-4 h-full">
                  <SmallLoanCard loan={{ id: 2, amount: "$500", interest: "4%", dueDate: "Aug 20, 2025", status: "Active" }} />
                  <SmallLoanCard loan={{ id: 3, amount: "$1,000", interest: "3%", dueDate: "June 25, 2025", status: "Pending" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <div className="bg-black text-white font-sans relative">
        <main className="overflow-x-hidden">
          <HeroSection onNavigateToApp={() => setCurrentPage("marketplace")} />
          <div className="bg-grid">
            <Features />
            <Reputation />
            <FaucetModule />
            <BuiltOnAptos />
            <CTASection onNavigateToApp={() => setCurrentPage("marketplace")} />
          </div>
        </main>
        <Footer />
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${["landing", "cards", "dashboard", "marketplace"].includes(currentPage) ? "bg-black text-white" : ""}`}>
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
