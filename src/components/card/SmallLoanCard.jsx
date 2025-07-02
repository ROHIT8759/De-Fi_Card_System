import React from 'react';

const SmallLoanCard = ({ loan }) => {
  return (
    <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-purple-400/20 rounded-xl p-5 shadow-lg shadow-purple-500/10 transition-all hover:shadow-purple-500/20 hover:drop-shadow-glow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Loan #{loan?.id || 'TBD'}</h3>
        <span className={`text-sm font-medium px-2 py-1 rounded-full border backdrop-blur-sm ${
          loan?.status === 'Active'
            ? 'bg-green-400/10 text-green-400 border-green-400/30'
            : loan?.status === 'Pending'
            ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30'
            : 'bg-gray-400/10 text-gray-300 border-gray-400/30'
        }`}>
          {loan?.status || 'Active'}
        </span>
      </div>

      {/* Loan Info */}
      <div className="space-y-3 text-sm text-white/80">
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="text-white font-semibold">{loan?.amount || '$0'}</span>
        </div>
        <div className="flex justify-between">
          <span>Interest:</span>
          <span className="text-white font-semibold">{loan?.interest || '0%'}</span>
        </div>
        <div className="flex justify-between">
          <span>Due Date:</span>
          <span className="text-white font-semibold">{loan?.dueDate || 'TBD'}</span>
        </div>
      </div>
    </div>
  );
};

export default SmallLoanCard;
