import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = 'bg-gray-100',
  className = ''
}) => {
  return (
    <span 
      className={`inline-flex items-center rounded-full ${color} px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;