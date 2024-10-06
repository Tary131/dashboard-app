import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string | undefined;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  userName,
  toggleDarkMode,
}) => {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md p-4">
      <div className="flex items-center">
        <h1 className="ml-3 text-2xl font-semibold dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <div
          className="relative inline-flex items-center w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 shadow-lg bg-gray-300 dark:bg-gray-800"
          onClick={toggleDarkMode}
          role="button"
          aria-pressed="false"
        >
          <div className="absolute left-1 top-1 w-5 h-5 rounded-full transition-transform duration-300 bg-white dark:bg-yellow-500 transform dark:translate-x-7 flex items-center justify-center shadow-md">
            <BsFillSunFill className="text-yellow-400 dark:hidden" />
            <BsFillMoonFill className="text-gray-700 hidden dark:block" />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        {isLoggedIn ? (
          <span className="ml-3 text-lg dark:text-white">{userName}</span>
        ) : (
          <span className="ml-3 text-lg dark:text-white">Guest</span>
        )}
      </div>
    </header>
  );
};

export default Header;
