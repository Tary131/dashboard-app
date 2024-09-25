import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string | undefined;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  userName,
  toggleDarkMode,
  isDarkMode,
}) => {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md p-4">
      <div className="flex items-center">
        <h1 className="ml-3 text-2xl font-semibold dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            className="hidden"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
          <div
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            onClick={toggleDarkMode}
            role="button"
            aria-pressed={isDarkMode}
          >
            {/* Moon icon for dark mode */}
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 ${
                isDarkMode ? 'translate-x-8 bg-gray-900 shadow-md' : 'bg-white'
              }`}
            >
              <BsFillMoonFill
                className={`text-gray-300 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
              />
            </span>
            {/* Sun icon for light mode */}
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 ${
                isDarkMode ? 'bg-gray-900' : 'translate-x-0'
              }`}
            >
              <BsFillSunFill
                className={`text-yellow-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
              />
            </span>
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
