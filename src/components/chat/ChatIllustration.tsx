import React from 'react';

export const ChatIllustration = ({ className = "" }) => (
  <div className={`relative w-40 h-40 flex items-center justify-center ${className}`}>
    {/* Background Glow */}
    <div className="absolute inset-0 bg-[#4ade80]/10 blur-[40px] rounded-full animate-pulse" />
    
    {/* Geometric Nature Stack */}
    <div className="relative z-10">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Foundation Circle */}
        <circle cx="60" cy="60" r="45" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-30" />
        
        {/* Floating Transmission Hexagons */}
        <path d="M60 20L72.9904 27.5V42.5L60 50L47.0096 42.5V27.5L60 20Z" fill="#4ade80" fillOpacity="0.1" stroke="#4ade80" strokeWidth="2" className="animate-[bounce_3s_infinite]" />
        <path d="M40 55L52.9904 62.5V77.5L40 85L27.0096 77.5V62.5L40 55Z" fill="#4ade80" fillOpacity="0.05" stroke="#4ade80" strokeWidth="1.5" strokeOpacity="0.4" className="animate-[pulse_4s_infinite]" />
        <path d="M80 55L92.9904 62.5V77.5L80 85L67.0096 77.5V62.5L80 55Z" fill="#4ade80" fillOpacity="0.05" stroke="#4ade80" strokeWidth="1.5" strokeOpacity="0.4" className="animate-[pulse_5s_infinite]" />
        
        {/* Core Seed/Transmission Point */}
        <circle cx="60" cy="60" r="8" fill="#4ade80" />
        <circle cx="60" cy="60" r="15" stroke="#4ade80" strokeWidth="1" className="animate-[ping_3s_infinite]" />
      </svg>
    </div>
  </div>
);
