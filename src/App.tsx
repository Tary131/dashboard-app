import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Students from './components/Students/Students';
import Subjects from './components/Subjects/SubjectDashboard';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Calendar/Calendar';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { loginUser } from './redux/slices/auth/authSlice';
import { auth } from './firebase/firebaseConfig';
import './i18n';

const App: FC = () => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') setIsDarkMode(true);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          loginUser.fulfilled({
            id: user.uid,
            email: user.email || '',
            name: user.displayName || '',
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Router>
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
          <Header
            isLoggedIn={isLoggedIn}
            userName={user?.name}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
          <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-1 p-5">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
