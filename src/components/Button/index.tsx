import React from 'react';
import './component.css';

export enum ButtonColor {
  Orange = 'orange',
  Blue = 'blue',
  Green = 'green',
  Red = 'red'
}

export interface IButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'orange' | 'blue' | 'green' | 'red';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean | false;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({
  id,
  color,
  onClick,
  children,
  disabled,
  className,
  type
}) => {
  let btnColor;

  switch (color) {
    case ButtonColor.Blue:
      btnColor = 'bg-blue-500 hover:bg-blue-600';
      break;
    case ButtonColor.Green:
      btnColor = 'bg-green-500 hover:bg-green-600';
      break;
    case ButtonColor.Red:
      btnColor = 'bg-red-500 hover:bg-red-600';
      break;
    default:
      btnColor = 'bg-orange-500 hover:bg-orange-600';
      break;
  }

  return (
    <div className="button-container">
      <button
        id={id}
        type={type}
        onClick={onClick}
        className={`${
          disabled
            ? 'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
            : `${btnColor} text-white`
        } focus:outline-none font-bold py-2 px-4 rounded-md transition duration-150 ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
