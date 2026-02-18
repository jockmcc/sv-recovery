
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  actions?: React.ReactNode;
  // Added onClick prop to support interactive cards (fixes error in Home.tsx)
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, title, subtitle, className = '', actions, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-3xl border border-slate-100 shadow-sm p-6 overflow-hidden transition-all ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''} ${className}`}
    >
      {(title || actions) && (
        <div className="flex justify-between items-start mb-4">
          <div>
            {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
