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
  type: 'button' | 'submit' | 'reset';
  color: 'orange' | 'blue' | 'green' | 'red';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean | false;
  children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({
  id,
  type,
  color,
  onClick,
  children,
  disabled
}) => {
  let btnColor;

  switch (color) {
    case ButtonColor.Blue:
      btnColor = 'blue';
      break;
    case ButtonColor.Green:
      btnColor = 'green';
      break;
    case ButtonColor.Red:
      btnColor = 'red';
      break;
    default:
      btnColor = 'orange';
      break;
  }

  return (
    <div className="button-container">
      <button
        id={id}
        type={type}
        className={`button ${btnColor} ${disabled ? 'disabled' : ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
