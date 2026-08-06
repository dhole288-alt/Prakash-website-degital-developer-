import React from 'react';
import logoImg from '../assets/images/prakash_logo_1786038840552.jpg';

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
    sm: { img: 'w-12 h-12', title: 'text-sm sm:text-base', marathiTitle: 'text-xs', tagline: 'text-[10px]' },
    md: { img: 'w-14 h-14 sm:w-16 sm:h-16', title: 'text-base sm:text-xl', marathiTitle: 'text-xs sm:text-sm', tagline: 'text-[11px] sm:text-xs' },
    lg: { img: 'w-20 h-20 sm:w-24 sm:h-24', title: 'text-2xl sm:text-3xl', marathiTitle: 'text-base sm:text-lg', tagline: 'text-xs sm:text-sm' },
    xl: { img: 'w-28 h-28 sm:w-36 sm:h-36', title: 'text-3xl sm:text-4xl', marathiTitle: 'text-xl sm:text-2xl', tagline: 'text-sm sm:text-base' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3.5 group select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Active Glowing HD Logo Container */}
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-500 rounded-2xl blur-md opacity-80 group-hover:opacity-100 transition duration-300 animate-pulse" />
        
        <div className={`${currentSize.img} relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-amber-400/90 bg-slate-950 p-0.5 shadow-2xl shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300`}>
          <img 
            src={logoImg} 
            alt="प्रकाश ग्राफिक्स डिझायनर - Prakash Graphic Designer HD Logo" 
            className="w-full h-full object-cover rounded-lg sm:rounded-xl"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + '/prakash_logo.jpg') {
                target.src = '/prakash_logo.jpg';
              }
            }}
          />
        </div>

        {/* Badge removed as requested */}
      </div>

      {/* Brand Typography & Dual Language Tagline (Marathi + English) */}
      <div className="flex flex-col justify-center">
        {/* Marathi Brand Name */}
        <span className={`font-black tracking-tight text-amber-300 drop-shadow-sm ${currentSize.marathiTitle}`}>
          प्रकाश ग्राफिक्स डिझायनर
        </span>

        {/* English Brand Name */}
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight text-white leading-tight ${currentSize.title}`}>
            Prakash <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Graphic Designer</span>
          </span>
        </div>
        
        {showTagline && (
          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
            <span className={`font-bold text-orange-400 ${currentSize.tagline}`}>
              कल्पकता ते वास्तविकता
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className={`text-slate-300 font-medium ${currentSize.tagline}`}>
              Creativity to Reality
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
