// src/components/marketplace/TradeInterface.jsx
import React, { useState } from 'react';

const TradeInterface = ({ selectedAsset }) => {
  const [tradeType, setTradeType] = useState('borrow');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('30');
  const [collateralType, setCollateralType] = useState('apt');

  const durations = [
    { value: '7', label: '7 days', apr: '6.5%' },
    { value: '30', label: '30 days', apr: '8.2%' },
    { value: '90', label: '90 days', apr: '9.5%' },
    { value: '180', label: '180 days', apr: '11.0%' }
  ];

  const collateralOptions = [
    { value: 'apt', label: 'APT Token', ltv: '80%', icon: '🔴' },
    { value: 'nft', label: 'NFT Collection', ltv: '60%', icon: '🖼️' },
    { value: 'lp', label: 'LP Tokens', ltv: '70%', icon: '💧' }
  ];

  const calculateInterest = () => {
    const principal = parseFloat(amount) || 0;
    const selectedDuration = durations.find(d => d.value === duration);
    const aprNum = parseFloat(selectedDuration?.apr) || 0;
    const days = parseInt(duration);
    return (principal * (aprNum / 100) * (days / 365)).toFixed(2);
  };

  const calculateTotal = () => {
    const principal = parseFloat(amount) || 0;
    const interest = parseFloat(calculateInterest()) || 0;
    return (principal + interest).toFixed(2);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          💹 Trade Interface
        </h3>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setTradeType('borrow')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tradeType === 'borrow' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Borrow
          </button>
          <button
            onClick={() => setTradeType('lend')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tradeType === 'lend' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Lend
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {tradeType === 'borrow' ? 'Borrow Amount' : 'Lend Amount'} (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Loan Duration
          </label>
          <div className="grid grid-cols-2 gap-2">
            {durations.map((dur) => (
              <button
                key={dur.value}
                onClick={() => setDuration(dur.value)}
                className={`p-3 rounded-lg border transition-colors ${
                  duration === dur.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {dur.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {dur.apr} APR
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Collateral Type (for borrowing) */}
        {tradeType === 'borrow' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Collateral Type
            </label>
            <div className="space-y-2">
              {collateralOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    collateralType === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="collateral"
                    value={option.value}
                    checked={collateralType === option.value}
                    onChange={(e) => setCollateralType(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-xl mr-3">{option.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Max LTV: {option.ltv}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Loan Summary */}
        {amount && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              {tradeType === 'borrow' ? 'Loan Summary' : 'Lending Summary'}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Principal:</span>
                <span className="font-medium text-gray-900 dark:text-white">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Interest:</span>
                <span className="font-medium text-gray-900 dark:text-white">${calculateInterest()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  Total {tradeType === 'borrow' ? 'Repayment' : 'Return'}:
                </span>
                <span className="font-bold text-gray-900 dark:text-white">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={!amount}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            amount
              ? tradeType === 'borrow'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
          }`}
        >
          {tradeType === 'borrow' ? '💰 Request Loan' : '🏦 Start Lending'}
        </button>

        {/* Risk Warning */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Risk Warning:</strong> {tradeType === 'borrow' 
              ? 'Failure to repay loans may result in collateral liquidation.' 
              : 'Lending involves smart contract risks and potential borrower default.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeInterface;
