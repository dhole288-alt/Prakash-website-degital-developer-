import React from 'react';
import pgdLogo from '../assets/images/pgd_tiranga_logo_1786174875083.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  showBadge = false,
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: { img: 'w-10 h-10', title: 'text-sm sm:text-base', marathiTitle: 'text-xs', tagline: 'text-[10px]' },
    md: { img: 'w-12 h-12 sm:w-14 sm:h-14', title: 'text-base sm:text-xl', marathiTitle: 'text-xs sm:text-sm', tagline: 'text-[11px] sm:text-xs' },
    lg: { img: 'w-16 h-16 sm:w-20 sm:h-20', title: 'text-2xl sm:text-3xl', marathiTitle: 'text-base sm:text-lg', tagline: 'text-xs sm:text-sm' },
    xl: { img: 'w-20 h-20 sm:w-24 sm:h-24', title: 'text-3xl sm:text-4xl', marathiTitle: 'text-xl sm:text-2xl', tagline: 'text-sm sm:text-base' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 sm:gap-3.5 group select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Official Tiranga PGD Monogram Logo */}
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-200 to-emerald-500 rounded-2xl blur-md opacity-85 group-hover:opacity-100 transition duration-300 animate-pulse" />
        
        <div className={`relative ${currentSize.img} rounded-xl sm:rounded-2xl border-2 border-orange-400/90 bg-slate-950 flex items-center justify-center p-0.5 shadow-xl shadow-orange-950/80 group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
          <img 
            src={pgdLogo} 
            alt="Prakash Graphic Designer Tiranga PGD Logo" 
            className="w-full h-full object-cover rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        {/* Marathi Brand Name in Saffron & Green accents */}
        <span className={`font-black tracking-tight text-amber-300 drop-shadow-sm ${currentSize.marathiTitle}`}>
          प्रकाश ग्राफिक्स डिझायनर
        </span>

        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight text-white leading-tight ${currentSize.title}`}>
            Prakash <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-slate-100 to-emerald-400">Graphic Designer</span>
          </span>
          {showBadge && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-400/30 rounded-md shadow-sm">
              PRO
            </span>
          )}
        </div>
        
        {showTagline && (
          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
            <span className={`font-bold text-orange-400 ${currentSize.tagline}`}>
              कल्पकता ते वास्तविकता
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className={`text-emerald-400 font-semibold ${currentSize.tagline}`}>
              Creativity to Reality
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
