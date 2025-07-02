// src/components/landing/CTASection.jsx
import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Your DeFi Journey?
        </h2>
        <p className="text-xl mb-8 text-purple-100">
          Join thousands of users who trust our platform for their lending needs.
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">$50M+</div>
              <div className="text-purple-200">Total Loans Issued</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">10K+</div>
              <div className="text-purple-200">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">99.9%</div>
              <div className="text-purple-200">Uptime</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg">
            💼 Connect Wallet & Start
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-purple-600 transition-all">
            📖 Read Documentation
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
