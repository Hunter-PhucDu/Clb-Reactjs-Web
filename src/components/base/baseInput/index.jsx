import React from 'react';
import './index.scss';

const BaseInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    errorMessage,
    required = false,
  }) => {
    return (
      <div className="base-input-container">
        {label && (
          <label htmlFor={name} className="base-input-label">
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`base-input-field ${errorMessage ? 'input-error' : ''}`}
        />
        {errorMessage && <p className="base-input-error">{errorMessage}</p>}
      </div>
    );
  };
  
  export default BaseInput;