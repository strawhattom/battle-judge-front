import React from 'react';
import ImageLogin from '@/assets/images/home-image-left.png';
import Logo from '@/assets/images/sopra_steria.png';

export interface LoginProps {
  children: React.ReactNode;
}

const HomeForm: React.FC<LoginProps> = ({ children }) => {
  return (
    <div className="text-center flex mt-0 h-screen">
      {/* <img className="object-cover" src={ImageLogin} /> */}
      <div className="flex w-full flex-col justify-center items-center">
        <img className="w-72 mx-auto mb-16" src={Logo} />
        {children}
      </div>
    </div>
  );
};

export default HomeForm;
