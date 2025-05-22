import React from 'react';
import Logo from '../../assets/Images/Logo.png';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-black text-white pt-8 pb-3 px-6 flex items-center justify-between w-full">
      {/* Left: Logo */}
      <div className="h-[60px]">
        <Link to="/home" className="block h-full">
          <img src={Logo} alt="Logo" className="h-full object-contain" />
        </Link>
      </div>
      {/* Right: User Info */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {/* Avatar with initials */}
          <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-black text-white font-semibold">
            MS
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Mishil</span>
            <span className="text-xs text-gray-400">Mishil@scaletech.xyz</span>
          </div>
          {/* Dropdown arrow */}
          <svg
            className="w-4 h-4 text-gray-400 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};
