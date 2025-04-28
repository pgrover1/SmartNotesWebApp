import React from 'react';

const Card = ({ children, className = '', bgColor = 'bg-white' }) => {
  return (
    <div className={`${bgColor} shadow rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-4 py-5 sm:px-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-4 py-4 sm:px-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;