import React, { useState } from 'react';

const LoanRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    term: '12',
    collateral: '',
    income: '',
    creditScore: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg shadow-cyan-500/10 space-y-8 text-white">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Loan Request Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">
              Loan Amount (APT)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">
              Loan Term
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-purple-400/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2">
            Purpose of Loan
          </label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-cyan-400/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          >
            <option value="">Select purpose</option>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="home">Home Improvement</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-300 mb-2">
            Collateral (NFT/Asset Address)
          </label>
          <input
            type="text"
            name="collateral"
            value={formData.collateral}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-pink-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter collateral address (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">
              Monthly Income (APT)
            </label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter monthly income"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">
              Credit Score
            </label>
            <input
              type="number"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              min="300"
              max="850"
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-yellow-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter credit score"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            className="flex-1 px-6 py-3 border border-white/10 text-white rounded-full bg-white/5 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanRequestForm;
