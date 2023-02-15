import React from 'react';
import './component.css';

export interface InputProps {
  type: 'file';
  name: string;
  value?: string | number;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  label
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputFile;
