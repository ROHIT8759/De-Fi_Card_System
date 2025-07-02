// src/components/landing/LandingLayout.jsx
import React from 'react';
import HeroSection from './HeroSection';
import Features from './Features';
import CTASection from './CTASection';

const LandingLayout = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Features />
      <CTASection />
    </div>
  );
};

export default LandingLayout;
