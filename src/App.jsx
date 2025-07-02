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
            <LandingNavbar />
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
          <div className="max-w-7xl mx-auto px-4 space-y-6">
            <SummaryHeader
              marketSize={marketStats.marketSize}
              totalBorrowed={marketStats.totalBorrowed}
              lentOut={marketStats.lentOut}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                  >
                    Toggle View: {viewMode === 'cards' ? 'Table' : 'Cards'}
                  </button>
                </div>

                <Filters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  chartRange={chartRange}
                  setChartRange={setChartRange}
                />

                {filteredCoins.length > 0 ? (
                  viewMode === 'cards' ? (
                    <div className="grid gap-6 md:grid-cols-2">
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
                    <AssetTable coins={filteredCoins.slice(0, 10)} onTrade={handleTrade} />
                  )
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p>Loading coin data...</p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <TradeInterface />
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto px-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProfileDashboard />
                <PersonalDetails />
              </div>
              <div className="space-y-6">
                <BalanceOverview />
              </div>
            </div>
          </div>
        );

      case 'cards':
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 text-white">
      {/* 💳 Header */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow">
          Loan Management
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Manage your active loans, request new ones, and track your eligibility.
        </p>
      </div>

      {/* 📝 Form + 📈 Eligibility */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Request Form */}
        <div className="lg:col-span-2">
          <LoanRequestForm />
        </div>

        {/* Eligibility Meter */}
        <div className="sticky top-32">
          <LoanEligibilityMeter score={75} />
        </div>
      </div>

      {/* 📋 Active Loans */}
      <div className="space-y-10">
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-300 via-cyan-300 to-pink-300 bg-clip-text text-transparent drop-shadow-glow">
          📋 Your Active Loans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Big Loan Card - left side */}
          <div className="md:col-span-2">
            <BigLoanCard loan={mockLoans[0]} />
          </div>

          {/* Small Loan Cards - right side */}
          <div className="flex flex-col gap-6">
            <SmallLoanCard loan={mockLoans[1]} />
            <SmallLoanCard loan={mockLoans[2]} />
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
      <div className={`min-h-screen bg-grid transition-colors duration-300 ${currentPage === 'landing' ? 'bg-black text-white' : 'bg-gray-50 dark:bg-gray-900'}`}>
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
        <main className="relative z-10">
          {renderPage()}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
