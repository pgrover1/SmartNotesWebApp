import React, { forwardRef } from 'react';

/**
 * @typedef {Object} Option
 * @property {string} value
 * @property {string} label
 */

const Select = forwardRef(
  ({ label, options, error, fullWidth = false, multiple = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    
    return (
      <div className={widthClass}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          multiple={multiple}
          className={`block rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm ${errorClass} ${widthClass} ${className}`}
          {...props}
        >
          {!multiple && <option value="">Select an option</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;