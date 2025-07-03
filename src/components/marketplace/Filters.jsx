import React from 'react';

function Filters({ searchTerm, setSearchTerm, sortBy, setSortBy, chartRange, setChartRange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Coin"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-white/5 text-white placeholder-white/50 border border-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      >
        <option value="rank">Sort by Rank</option>
        <option value="volume">Sort by Volume</option>
      </select>

      {/* Chart Range Dropdown */}
      <select
        value={chartRange}
        onChange={(e) => setChartRange(e.target.value)}
        className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
      >
        <option value="1d">1 Day</option>
        <option value="7d">7 Days</option>
        <option value="30d">30 Days</option>
      </select>
    </div>
  );
}

export default Filters;
