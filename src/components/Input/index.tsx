import React from 'react';
import './component.css';

export interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  label,
  disabled
}) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
