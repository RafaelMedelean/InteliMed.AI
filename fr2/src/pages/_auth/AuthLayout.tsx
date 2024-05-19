import React from 'react';
import { Outlet } from 'react-router-dom';
import intelliMedImg from '../../assets/InteliMed.AI.png';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-2/5 flex items-center justify-center">
        <Outlet />
      </div>
      <div className="w-3/5 hidden lg:flex items-center justify-center bg-gray-200">
        <img src={intelliMedImg} alt="Description of the image" className="" />
      </div>
    </div>
  );
};

export default AuthLayout;
