// src/components/Header/Header.tsx
import React, { useState } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userName }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md p-4">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src="" alt="Logo" className="h-8 w-auto" />
        <h1 className="ml-3 text-2xl font-semibold dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Dark mode toggle */}
      <div className="flex items-center justify-center">
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 p-2 rounded-md focus:outline-none"
        >
          {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      {/* User avatar and name */}
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <img src="" alt="User Avatar" className="h-8 w-8 rounded-full" />
            <span className="ml-3 text-lg dark:text-white">{userName}</span>
          </>
        ) : (
          <span className="text-lg dark:text-white">Guest</span>
        )}
      </div>
    </header>
  );
};

export default Header;
