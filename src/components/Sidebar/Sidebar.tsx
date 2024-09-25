import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BsArrowLeftShort,
  BsFillHouseDoorFill,
  BsGlobe,
  BsFillPeopleFill,
  BsGearFill,
  BsReverseListColumnsReverse,
  BsCalendar2DayFill,
} from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/slices/auth/authSlice';
import AuthModal from '../Auth/AuthModal.tsx';
import { useTranslation } from 'react-i18next';

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
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      dispatch(logoutUser());
    } else {
      setShowModal(true);
    }
  };

  const handleLanguageChange = (lang: string) => {
    console.log(`Changing language to: ${lang}`);
    i18n.changeLanguage(lang);
    localStorage.setItem('user-lang', lang);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gradient-to-r from-gray-100 to-white border-r shadow-lg h-full p-5 pt-8 ${open ? 'w-72' : 'w-20'} duration-300 relative flex flex-col`}
      >
        {/* Toggle Button */}
        <BsArrowLeftShort
          className={`bg-gray-300 text-black text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer hover:bg-gray-400 transition-transform duration-300 ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />

        {/* Menu Items */}
        <ul className="flex-grow space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`group flex items-center gap-4 p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 relative ${location.pathname === `/${item.key}` ? 'bg-gray-300' : ''} ${!open && 'justify-center'}`}
            >
              <Link
                to={`/${item.key}`}
                className="flex items-center gap-4 w-full h-full"
              >
                <span
                  className={`text-2xl ${location.pathname === `/${item.key}` ? 'text-blue-500' : 'text-gray-600'}`}
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

        {/* Bottom Menu Items */}
        <div className="flex flex-col mt-auto space-y-2">
          {/* Language Switcher */}
          <div className="group flex items-center gap-4 p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 relative">
            <BsGlobe className="text-2xl text-gray-600" />
            {open && (
              <span className="text-base font-medium">{t('language')}</span>
            )}
            <select
              onChange={(e) => handleLanguageChange(e.target.value)}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="cz">Czech</option>
            </select>
          </div>

          {/* Auth Action */}
          <div
            onClick={handleAuthClick}
            className="group flex items-center gap-4 p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 relative"
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

      {/* Auth Modal */}
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Sidebar;
