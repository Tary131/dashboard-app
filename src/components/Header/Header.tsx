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
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 p-2 rounded-md focus:outline-none"
        >
          {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
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
