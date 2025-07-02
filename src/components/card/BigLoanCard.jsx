import React from 'react';

const BigLoanCard = ({ loan }) => {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-500/10 transition-all hover:shadow-cyan-500/20 hover:drop-shadow-glow">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Loan #{loan?.id || 'TBD'}</h2>
          <p className="text-white/70">{loan?.type || 'Personal Loan'}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border ${
          loan?.status === 'Active'
            ? 'bg-green-400/10 text-green-400 border-green-400/30'
            : loan?.status === 'Pending'
            ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30'
            : 'bg-gray-400/10 text-gray-300 border-gray-400/30'
        }`}>
          {loan?.status || 'Active'}
        </span>
      </div>

      {/* Main Amount Block */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-cyan-400/20 text-center shadow shadow-cyan-500/10 mb-4">
        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
          {loan?.amount || '$0'}
        </div>
        <p className="text-white/70 text-sm">Principal Amount</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-white/60 text-sm">Interest Rate</p>
          <p className="text-white text-lg font-medium">{loan?.interestRate || '0%'}</p>
        </div>
        <div>
          <p className="text-white/60 text-sm">Term</p>
          <p className="text-white text-lg font-medium">{loan?.term || '0 months'}</p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm text-white/80">
          <span>Monthly Payment:</span>
          <span className="text-white font-semibold">{loan?.monthlyPayment || '$0'}</span>
        </div>
        <div className="flex justify-between text-sm text-white/80">
          <span>Next Payment:</span>
          <span className="text-white font-semibold">{loan?.nextPayment || 'TBD'}</span>
        </div>
        <div className="flex justify-between text-sm text-white/80">
          <span>Remaining Balance:</span>
          <span className="text-white font-semibold">{loan?.remainingBalance || '$0'}</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] border border-cyan-400/20 backdrop-blur-sm">
        Make Payment
      </button>
    </div>
  );
};

export default BigLoanCard;
