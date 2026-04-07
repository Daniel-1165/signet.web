import React from 'react';

export const GerminationAnimation = ({ className = "" }) => (
  <div className={`relative flex flex-col items-center justify-end h-64 w-full ${className}`}>
    {/* The Soil (Grounding) */}
    <div className="w-full h-8 bg-[#78350F] rounded-full opacity-20 blur-sm absolute bottom-0" />
    <div className="w-1/2 h-4 bg-terra-soil rounded-full absolute bottom-2 opacity-30 shadow-[0_4px_20px_rgba(120,53,15,0.4)]" />
    
    {/* The Seedling */}
    <div className="relative bottom-4 flex flex-col items-center">
      {/* Stem */}
      <div className="w-1.5 h-32 bg-[#4ade80] rounded-full animate-germinate relative">
        {/* Leaves */}
        <div className="absolute -left-6 top-10 w-8 h-4 bg-[#4ade80] rounded-[100%_0%_100%_0%] rotate-[-20deg] shadow-[0_0_10px_#4ade80/20]" />
        <div className="absolute -right-6 top-4 w-8 h-4 bg-[#4ade80] rounded-[0%_100%_0%_100%] rotate-[20deg] shadow-[0_0_10px_#4ade80/20]" />
        <div className="absolute -left-8 top-0 w-10 h-5 bg-[#4ade80] rounded-[100%_0%_100%_0%] rotate-[-40deg] shadow-[0_0_15px_#4ade80/30]" />
        
        {/* The Solar Pulse at the tip */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-solar-gold rounded-full blur-[8px] animate-pulse" />
      </div>
    </div>

    {/* Rising Vision Particles */}
    <div className="absolute inset-0 pointer-events-none">
       <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-vision-blue rounded-full animate-ping opacity-40" />
       <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-solar-gold rounded-full animate-bounce opacity-30" />
       <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-vision-blue rounded-full animate-pulse opacity-20" />
    </div>
  </div>
);
