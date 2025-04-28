import React from 'react';

const Badge = ({ 
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