import React from 'react';

const SummaryHeader = ({ marketSize, totalBorrowed, lentOut }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
      {/* Metrics */}
      <div className="flex gap-4 flex-wrap">
        <div className="min-w-[200px] px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white shadow-md hover:shadow-purple-500/20 transition">
          <p className="text-sm text-white/60 mb-1">Current Market Size</p>
          <p className="text-2xl font-bold text-green-400">${marketSize.toLocaleString()}</p>
        </div>
        <div className="min-w-[200px] px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white shadow-md hover:shadow-red-500/20 transition">
          <p className="text-sm text-white/60 mb-1">Total Borrowed</p>
          <p className="text-2xl font-bold text-red-400">${totalBorrowed.toLocaleString()}</p>
        </div>
        <div className="min-w-[200px] px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white shadow-md hover:shadow-blue-500/20 transition">
          <p className="text-sm text-white/60 mb-1">Lent Out</p>
          <p className="text-2xl font-bold text-blue-400">{lentOut}%</p>
        </div>
      </div>

      {/* Bridge CTA */}
      <a
        href="https://bridge.example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 lg:mt-0 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all"
      >
        Bridge your asset from EVM chain
      </a>
    </div>
  );
};

export default SummaryHeader;
