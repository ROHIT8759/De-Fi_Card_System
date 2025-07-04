import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

// Import error boundary
import ErrorBoundary from './components/ErrorBoundary';

// Import navigation
import NavBar from './components/NavBar';
import LandingNavbar from './components/landing/Navbar';

// Import landing components
import HeroSection from './components/landing/HeroSection';
import Features from './components/landing/Features';
import CTASection from './components/landing/CTASection';
import Reputation from './components/landing/Reputation';
import FaucetModule from './components/landing/FaucetModule';
import BuiltOnAptos from './components/landing/BuiltOnAptos';
import Footer from './components/landing/Footer';

// Import dashboard components
import ProfileDashboard from './components/dashboard/ProfileDashboard';
import PersonalDetails from './components/dashboard/PersonalDetails';
import BalanceOverview from './components/dashboard/BalanceOverview';

// Import marketplace components
import Filters from './components/marketplace/Filters';
import CoinCard from './components/marketplace/CoinCard';
import AssetTable from './components/marketplace/AssetTable';
import SummaryHeader from './components/marketplace/SummaryHeader';
import TradeInterface from './components/marketplace/TradeInterface';

// Import card components
import SmallLoanCard from './components/card/SmallLoanCard';
import BigLoanCard from './components/card/BigLoanCard';
import LoanRequestForm from './components/card/LoanRequestForm';
import LoanEligibilityMeter from './components/card/LoanEligibilityMeter';

// Import wallet components
// SimpleWalletButton removed - not used and file doesn't exist

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [walletAddress, setWalletAddress] = useState('');
  
  // Dashboard/Marketplace state
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [chartRange, setChartRange] = useState('7d');
  const [viewMode, setViewMode] = useState('cards');
  const [showBorrowPopup, setShowBorrowPopup] = useState(false);

  const coinList = 'bitcoin,ethereum,uniswap,aave,curve-dao-token,chainlink,litecoin,maker,compound-governance-token,the-graph,optimism,arbitrum,avalanche-2,solana,toncoin';

  // Mock wallet connection with useCallback for optimization
  const handleWalletConnect = useCallback((address) => {
    setWalletAddress(address);
  }, []);

  // Fetch coin data when needed
  useEffect(() => {
    if (currentPage === 'marketplace' || currentPage === 'dashboard') {
      const fetchData = async () => {
        try {
          const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              ids: coinList,
              order: 'market_cap_desc',
              sparkline: true,
              price_change_percentage: '1h,24h,7d',
            },
          });
          setCoins(res.data);
          setFilteredCoins(res.data);
        } catch (error) {
          console.error('Failed to fetch coin data:', error);
        }
      };
      fetchData();
    }
  }, [currentPage]);

  // Filter and sort coins
  useEffect(() => {
    let data = [...coins];
    if (searchTerm) {
      data = data.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy === 'volume') {
      data.sort((a, b) => b.total_volume - a.total_volume);
    } else {
      data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
    }
    setFilteredCoins(data);
  }, [searchTerm, sortBy, coins]);

  // Handle trading with useCallback for optimization
  const handleTrade = useCallback((coin, isBuy) => {
    alert(`${isBuy ? 'Buying' : 'Selling'} ${coin.name} - Feature coming soon!`);
  }, []);

  // Mock loan data for cards
  const mockLoans = [
    {
      id: '001',
      amount: '$5,000',
      interestRate: '8.5%',
      term: '12 months',
      monthlyPayment: '$456',
      nextPayment: 'Jul 15, 2025',
      remainingBalance: '$4,200',
      status: 'Active'
    },
    {
      id: 2,
    amount: '$500',
    interest: '4%',
    dueDate: 'Aug 20, 2025',
    status: 'Active'
    },
    {
    id: 3,
    amount: '$1,000',
    interest: '3%',
    dueDate: 'June 25, 2025',
    status: 'Pending'
  }
  ];

  // Compute stats for marketplace with useMemo for optimization
  const marketStats = useMemo(() => {
    const marketSize = filteredCoins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
    const totalBorrowed = filteredCoins.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
    const lentOut = marketSize > 0 ? ((totalBorrowed / marketSize) * 100).toFixed(2) : 0;
    
    return { marketSize, totalBorrowed, lentOut };
  }, [filteredCoins]);

  // Render different pages based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <div className="bg-black text-white font-sans relative">
            <main className="overflow-x-hidden">
              <HeroSection onNavigateToApp={() => setCurrentPage('marketplace')} />
              <div className="bg-grid">
                <Features />
                <Reputation />
                <FaucetModule />
                <BuiltOnAptos />
                <CTASection onNavigateToApp={() => setCurrentPage('marketplace')} />
              </div>
            </main>
            <Footer />
          </div>
        );

      case 'marketplace':
        return (
          <div className=" pt-10 relative max-w-7xl mx-auto space-y-6">
            {/* Summary Header */}
            <SummaryHeader
              marketSize={marketStats.marketSize}
              totalBorrowed={marketStats.totalBorrowed}
              lentOut={marketStats.lentOut}
            />

            {/* Filters + Toggle Buttons */}
            <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
              {/* Filters Block */}
              <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                chartRange={chartRange}
                setChartRange={setChartRange}
              />

              {/* Toggle + Borrow Buttons */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm min-w-[150px]"
                >
                  Toggle View: {viewMode === 'cards' ? 'Table' : 'Cards'}
                </button>

                <button
                  onClick={() => setShowBorrowPopup(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm min-w-[150px]"
                >
                  Open Borrowing
                </button>
              </div>
            </div>

            {/* Coin View */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg pb-12">
              {filteredCoins.length > 0 ? (
                viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCoins.slice(0, 6).map((coin) => (
                      <CoinCard
                        key={coin.id}
                        coin={coin}
                        chartRange={chartRange}
                        onTrade={handleTrade}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <AssetTable coins={filteredCoins.slice(0, 10)} onTrade={handleTrade} />
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                  <p>Loading coin data...</p>
                </div>
              )}
            </div>

            {/* Borrowing Popup Modal */}
            {showBorrowPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 shadow-2xl w-[650px] relative">
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

            <div className="w-full flex justify-center items-start gap-10 px-4">
              {/* LEFT COLUMN: Request Form + Big Loan Card */}
              <div className="flex flex-col gap-6 w-[640px]">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
                  <LoanRequestForm />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg">
                  <BigLoanCard loan={mockLoans[0]} />
                </div>
              </div>

              {/* RIGHT COLUMN: Eligibility Meter + Small Loan Cards */}
              <div className="flex flex-col gap-6 w-[425px]">
                <div className="bg-white/5 border border-white/10 rounded-lg px-8 py-8 shadow-lg">
                  <LoanEligibilityMeter score={75} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 shadow-lg h-[382px]">
                  <div className="flex flex-col space-y-4 h-full">
                    <SmallLoanCard loan={mockLoans[1]} />
                    <SmallLoanCard loan={mockLoans[2]} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
        
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 text-center py-20">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              The page you're looking for doesn't exist.
            </p>
          </div>
        );
    }
  };
  
  return (
    <ErrorBoundary>
      <div
        className={`w-full min-h-screen relative ${
          currentPage === 'landing' || currentPage === 'cards' || currentPage === 'dashboard' || currentPage === 'marketplace'
            ? 'bg-black text-white bg-grid'
            : 'bg-gray-900 text-white'
        }`}
        style={{ minHeight: '100vh', width: '100vw' }}
      >
        {/* 🌐 Navigation Bar */}
        <div className="relative z-20 w-full">
          {currentPage === 'landing' ? (
            <LandingNavbar 
              onNavigateToApp={() => setCurrentPage('marketplace')}
              onWalletConnect={() => handleWalletConnect({ address: '0x1234...abcd' })}
            />
          ) : (
            <NavBar 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              walletAddress={walletAddress}
              onWalletConnect={handleWalletConnect}
            />
          )}
        </div>

        {/* 🧠 Main Content Area */}
        <main
          className={`relative z-10 w-full min-h-screen ${
            currentPage !== 'landing' ? 'pt-16 md:pt-20' : ''
          }`}
          style={{ minHeight: '100vh', width: '100%' }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
