import React from 'react';
import ImageLogin from '@/assets/images/home-image-left.png';
import Logo from '@/assets/images/sopra_steria.png';
import './component.css';

export interface LoginProps {
  children: React.ReactNode;
}

const HomeForm: React.FC<LoginProps> = ({ children }) => {
  return (
    <div className="login-container">
      <img className="image-login" src={ImageLogin} />
      <div className="login-form">
        <img className="logo" src={Logo} />
        {children}
      </div>
    </div>
  );
};

export default HomeForm;
