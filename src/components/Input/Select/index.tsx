import React from 'react';

export interface SelectProps {
  name: string;
  options: string[];
  value?: string | number;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  disabled
}) => {
  return (
    <div className="flex justify-between items-center flex-row ">
      <label className="text-left text-xl w-full" htmlFor={name}>
        {label}
      </label>
      <select
        className="text-l h-12 pl-5 bg-zinc-100 text-black rounded m-2 focus:outline-none"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
