import React from "react";

const TrustScoreCard = ({ score }) => {
  const tier = score >= 86 ? 4 : score >= 61 ? 3 : score >= 31 ? 2 : 1;
  const tierLabel = ["Ineligible", "Basic", "Standard", "Advanced", "Elite"][tier];

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-6 rounded-xl shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">🎖 TrustScore NFT</h2>
      <p className="text-5xl font-extrabold tracking-widest">{score}</p>
      <p className="text-lg mt-2">Tier: <span className="font-semibold">{tierLabel}</span></p>
      <p className="text-xs mt-1 text-white/70">Dynamic reputation from loan activity</p>
    </div>
  );
};

export default TrustScoreCard;
