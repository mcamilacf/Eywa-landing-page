import React from 'react';

interface EywaLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EywaLogo: React.FC<EywaLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const WateringCanSVG = (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizes[size]} shrink-0 ${className}`}
    >
      {/* Botanical Stem with Leaves and Berries behind */}
      <path
        d="M60 110 C45 80 30 50 48 20 C52 15 60 10 70 8"
        stroke="#5A6D47"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaves along the stem */}
      <path
        d="M50 85 C38 80 30 70 32 60 C42 62 48 72 50 85 Z"
        fill="#6B7C59"
      />
      <path
        d="M44 65 C32 58 25 46 28 38 C38 40 43 52 44 65 Z"
        fill="#5A6D47"
      />
      <path
        d="M52 42 C42 32 38 20 45 15 C52 20 54 32 52 42 Z"
        fill="#6B7C59"
      />
      <path
        d="M62 25 C56 12 58 2 68 2 C72 10 68 20 62 25 Z"
        fill="#5A6D47"
      />
      {/* Berries */}
      <circle cx="72" cy="18" r="3" fill="#3B4D30" />
      <circle cx="80" cy="22" r="3.5" fill="#3B4D30" />
      <circle cx="76" cy="30" r="2.5" fill="#3B4D30" />

      {/* Main Watering Can Body */}
      <path
        d="M62 48 H100 L108 112 H54 L62 48 Z"
        fill="#5A6D47"
      />
      {/* Watering Can Rim / Top opening */}
      <ellipse cx="81" cy="48" rx="19" ry="5" fill="#6B7C59" />

      {/* Handle */}
      <path
        d="M62 58 C45 58 42 85 54 96"
        stroke="#5A6D47"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Spout */}
      <path
        d="M98 72 L128 52 L138 42 L142 52 L132 64 L104 84 Z"
        fill="#5A6D47"
      />
      {/* Rose / Sprinkler Head */}
      <path
        d="M136 38 L148 56 M136 38 L144 32 L152 50 L148 56 Z"
        fill="#6B7C59"
      />

      {/* Heart Cutout in the center of watering can */}
      <path
        d="M81 83 C81 83 71 75 71 69 C71 65.5 73.5 63 77 63 C79.2 63 80.4 64.2 81 65.2 C81.6 64.2 82.8 63 85 63 C88.5 63 91 65.5 91 69 C91 75 81 83 81 83 Z"
        fill="#F7F7F2"
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return WateringCanSVG;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {WateringCanSVG}
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#3B4D30] mt-2">
          Eywa
        </h1>
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#5A6D47] mt-1">
          Kits de Jardinería
        </span>
        <div className="flex items-center gap-2 mt-1 text-[#5A6D47] text-xs">
          <span className="h-[1px] w-6 bg-[#5A6D47]/40" />
          <span className="text-[10px]">♥</span>
          <span className="h-[1px] w-6 bg-[#5A6D47]/40" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 text-left ${className}`}>
      {WateringCanSVG}
      <div>
        <span className="font-serif font-bold text-2xl tracking-tight text-[#3B4D30] block leading-none">
          Eywa
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold text-[#5A6D47] block mt-1">
          Kits de Jardinería
        </span>
      </div>
    </div>
  );
};
