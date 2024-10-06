import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BsArrowLeftShort,
  BsFillHouseDoorFill,
  BsFillPeopleFill,
  BsGearFill,
  BsReverseListColumnsReverse,
  BsCalendar2DayFill,
} from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  logoutUser,
  selectIsLoggedIn,
  selectUser,
} from '../../redux/slices/auth/authSlice';
import AuthModal from '../Auth/AuthModal.tsx';
import { useTranslation } from 'react-i18next';
import { US, CZ } from 'country-flag-icons/react/3x2';

type PageKey = 'dashboard' | 'subjects' | 'students' | 'calendar' | 'settings';
type MenuItem = {
  name: string;
  icon: React.ReactElement;
  key: PageKey;
};

const menuItems: MenuItem[] = [
  { name: 'dashboard', icon: <BsFillHouseDoorFill />, key: 'dashboard' },
  { name: 'subjects', icon: <BsReverseListColumnsReverse />, key: 'subjects' },
  { name: 'students', icon: <BsFillPeopleFill />, key: 'students' },
  { name: 'calendar', icon: <BsCalendar2DayFill />, key: 'calendar' },
  { name: 'settings', icon: <BsGearFill />, key: 'settings' },
];

const Sidebar: FC = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      dispatch(logoutUser());
    } else {
      setShowModal(true);
    }
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('user-lang', lang);
  };

  const currentLanguage = i18n.language === 'en' ? 'English' : 'Czech';
  const currentFlag =
    i18n.language === 'en' ? (
      <US style={{ width: '24px', height: 'auto' }} />
    ) : (
      <CZ style={{ width: '24px', height: 'auto' }} />
    );

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gradient-to-r from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 border-r shadow-lg h-full p-5 pt-8 ${
          open ? 'w-72' : 'w-20'
        } duration-300 flex flex-col relative`}
      >
        <BsArrowLeftShort
          className={`bg-gray-300 dark:bg-gray-700 text-black dark:text-white text-3xl rounded-full absolute -right-3 top-8 border border-black cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-transform duration-300 ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />

        <ul className="flex-grow space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`group flex items-center gap-4 p-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200 relative ${
                location.pathname === `/${item.key}`
                  ? 'bg-gray-300 dark:bg-gray-700'
                  : ''
              } ${!open && 'justify-center'}`}
            >
              <Link
                to={`/${item.key}`}
                className="flex items-center gap-4 w-full h-full"
              >
                <span
                  className={`text-2xl ${
                    location.pathname === `/${item.key}`
                      ? 'text-blue-500 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {item.icon}
                </span>
                {open && (
                  <span className="text-base font-medium">{t(item.name)}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer Section */}
        <div className="mt-auto space-y-2">
          <div
            onClick={() =>
              handleLanguageChange(i18n.language === 'en' ? 'cz' : 'en')
            }
            className="group flex items-center justify-center gap-4 p-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
          >
            <div className="flex items-center justify-center gap-2 ">
              {currentFlag}
              {open && (
                <span className="text-base font-medium">{currentLanguage}</span>
              )}
            </div>
          </div>

          <div
            onClick={handleAuthClick}
            className="group flex items-center gap-4 p-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
          >
            <span className="text-2xl">{isLoggedIn ? '🔓' : '🔑'}</span>
            {open && (
              <span className="text-base font-medium">
                {isLoggedIn ? `${t('logout')} (${user?.name})` : t('login')}
              </span>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Sidebar;
