import { FC, ReactElement, useState } from 'react';
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

type PageKey = 'dashboard' | 'subjects' | 'students' | 'calendar' | 'settings';
type MenuItem = {
  name: string;
  icon: ReactElement;
  key: PageKey;
};

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: <BsFillHouseDoorFill />, key: 'dashboard' },
  { name: 'Subjects', icon: <BsReverseListColumnsReverse />, key: 'subjects' },
  { name: 'Students', icon: <BsFillPeopleFill />, key: 'students' },
  { name: 'Calendar', icon: <BsCalendar2DayFill />, key: 'calendar' },
  { name: 'Settings', icon: <BsGearFill />, key: 'settings' },
];

const Sidebar: FC = () => {
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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
                  <span className="text-base font-medium">{item.name}</span>
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
            {open && <span className="text-base font-medium">Language</span>}
          </div>

          {/* Auth Action */}
          <div
            className="group flex items-center gap-4 p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 relative"
            onClick={() => {
              if (isLoggedIn) {
                setIsLoggedIn(false);
              } else {
              }
            }}
          >
            <span className="text-2xl">{isLoggedIn ? '🔓' : '🔑'}</span>
            {open && (
              <span className="text-base font-medium">
                {isLoggedIn ? 'Log Out' : 'Log In / Registration'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
