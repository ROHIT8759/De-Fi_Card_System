// src/components/landing/HeroSection.jsx
import React from 'react';

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            🏦 DeFi Lending
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Made Simple
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Unlock instant loans on Aptos blockchain using your on-chain reputation and digital assets as collateral.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate && onNavigate('cards')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Start Borrowing
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('marketplace')}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all"
            >
              📊 View Marketplace
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
