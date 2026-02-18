
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'recover' | 'phoenix' | 'profile' | 'abstract';
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", variant = 'recover' }) => {
  const renderLogo = () => {
    switch (variant) {
      case 'recover':
        return (
          <g transform="translate(10, 10) scale(0.8)">
            {/* Gradient definition for the main logo elements */}
            <defs>
              <linearGradient id="recoverGrad" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#88B29C" />
                <stop offset="100%" stopColor="#3B7080" />
              </linearGradient>
            </defs>
            
            {/* Outer Circular Frame (Thin Gradient) */}
            <path 
              d="M50 5 C75 5, 95 25, 95 50 C95 75, 75 95, 50 95 C25 95, 5 75, 5 50 C5 25, 25 5, 50 5" 
              stroke="url(#recoverGrad)" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              opacity="0.6"
            />

            {/* Cupping Hands at the Bottom - Symbolizing Support */}
            <path 
              d="M25 75 Q30 88, 50 92 Q70 88, 75 75" 
              stroke="url(#recoverGrad)" 
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Stylized S V R Text */}
            <text 
              x="50" 
              y="58" 
              textAnchor="middle" 
              fill="url(#recoverGrad)" 
              style={{ 
                fontSize: '32px', 
                fontWeight: '900', 
                fontFamily: 'Lora, serif',
                letterSpacing: '2px'
              }}
            >
              SVR
            </text>

            {/* Radiant Sparks for Hope */}
            <circle cx="50" cy="20" r="2" fill="#F18F60" />
            <g opacity="0.4">
              <line x1="50" y1="12" x2="50" y2="16" stroke="#F18F60" strokeWidth="1" strokeLinecap="round" />
              <line x1="44" y1="15" x2="47" y2="18" stroke="#F18F60" strokeWidth="1" strokeLinecap="round" />
              <line x1="56" y1="15" x2="53" y2="18" stroke="#F18F60" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Subtle organic leaves around the SVR */}
            <path d="M15 45 Q10 35, 20 30" stroke="url(#recoverGrad)" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
            <path d="M85 45 Q90 35, 80 30" stroke="url(#recoverGrad)" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
          </g>
        );
      case 'profile':
        return (
          <g transform="translate(10, 10) scale(0.8)">
            <path d="M70 10C85 10 85 30 70 40C50 50 50 70 70 80" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M35 25C25 25 20 35 25 50L45 85" stroke="#3E5632" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M25 50Q45 50 65 30" stroke="#C2B280" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          </g>
        );
      case 'abstract':
        return (
          <g transform="translate(15, 15) scale(0.7)">
            <circle cx="50" cy="50" r="45" stroke="#F1EDE4" strokeWidth="2" />
            <path d="M20 50C20 20 80 20 80 50C80 80 20 80 20 50" stroke="url(#logoGrad)" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M35 35L50 65L65 35" stroke="#3E5632" strokeWidth="10" strokeLinecap="round" fill="none" />
          </g>
        );
      case 'phoenix':
        return (
          <g transform="translate(10, 10) scale(0.8)">
            <path d="M5 35C20 25 45 45 50 60C55 45 80 25 95 35" stroke="#7D8F69" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M50 15C65 15 75 25 75 40C75 55 50 65 35 65C20 65 15 75 25 85C35 95 65 95 75 85" stroke="url(#logoGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M50 15C42 15 38 20 35 30C32 40 38 45 42 45" stroke="#3E5632" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="42" cy="32" r="3" fill="#C2B280" />
            <circle cx="85" cy="20" r="1.5" fill="#C2B280" opacity="0.6" />
            <circle cx="15" cy="20" r="1.5" fill="#C2B280" opacity="0.6" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3E5632" />
          <stop offset="100%" stopColor="#7D8F69" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#F1EDE4" opacity="0.3" />
      {renderLogo()}
    </svg>
  );
};

export default Logo;
