import React from 'react';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const ALLOWED_TYPES = '.txt';

export interface InputProps {
  name: string;
  value?: string | number;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: React.FC<InputProps> = ({ name, value, onChange, label }) => {
  return (
    <div className="flex justify-between items-center flex-row ">
      <label
        className="flex items-center text-left text-xl w-full"
        htmlFor={name}
      >
        {label}
        <div className="flex justify-center items-center w-full ml-8 h-12 bg-zinc-100 text-black rounded m-2 px-3 cursor-pointer focus:outline-none">
          <ArrowUpOnSquareIcon className="w-5 h-5 mr-1 inline-block" />
          <p className="text-base">Déposez ici</p>
        </div>
        <input
          className="hidden"
          type="file"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          multiple
          accept={ALLOWED_TYPES}
        />
      </label>
    </div>
  );
};

export default InputFile;
