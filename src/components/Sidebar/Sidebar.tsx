import { useState } from 'react';
import {
  BsArrowLeftShort,
  BsFillHouseDoorFill,
  BsGlobe,
  BsFillPeopleFill,
  BsGearFill,
  BsReverseListColumnsReverse,
} from 'react-icons/bs';
const menuItems = [
  { name: 'Dashboard', icon: <BsFillHouseDoorFill /> },
  { name: 'Subjects', icon: <BsReverseListColumnsReverse /> },
  { name: 'Students', icon: <BsFillPeopleFill /> },
  { name: 'Settings', icon: <BsGearFill /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const [language, setLanguage] = useState("en");

  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
    }
  };

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
          {menuItems.slice(0, 4).map((item, index) => (
            <li
              key={index}
              className={`group flex items-center gap-4 p-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 relative ${activeMenuItem === index ? 'bg-gray-300' : ''} ${!open && 'justify-center'}`}
              onClick={() => setActiveMenuItem(index)}
            >
              <span
                className={`text-2xl ${activeMenuItem === index ? 'text-blue-500' : 'text-gray-600'}`}
              >
                {item.icon}
              </span>
              {open && (
                <span className="text-base font-medium">{item.name}</span>
              )}
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
            onClick={handleAuthAction}
          >
            <span className="text-2xl">{isLoggedIn ? '🔓' : '🔑'}</span>{' '}
            {/* Use appropriate icons */}
            {open && (
              <span className="text-base font-medium">
                {isLoggedIn ? 'Log Out' : 'Log In / Registration'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1">
        <h1 className="text-2xl font-semibold">Home Page</h1>
      </div>
    </div>
  );
};

export default Sidebar;
