// src/components/landing/Features.jsx
import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Instant Loans',
      description: 'Get approved in seconds based on your on-chain reputation and collateral.'
    },
    {
      icon: '🔒',
      title: 'Secure & Trustless',
      description: 'Smart contracts ensure your assets are safe and terms are automatically enforced.'
    },
    {
      icon: '💎',
      title: 'Reputation-Based',
      description: 'Build your on-chain credit score for better rates and higher loan amounts.'
    },
    {
      icon: '🌐',
      title: 'Multi-Asset Support',
      description: 'Use APT, NFTs, and other Aptos assets as collateral for your loans.'
    },
    {
      icon: '📈',
      title: 'Competitive Rates',
      description: 'Dynamic interest rates based on market conditions and your reputation.'
    },
    {
      icon: '🔄',
      title: 'Flexible Terms',
      description: 'Choose from various loan durations and repayment schedules.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of lending with blockchain technology and smart contracts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
