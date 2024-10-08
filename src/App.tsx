import { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Students from './components/Students/Students';
import Subjects from './components/Subjects/SubjectDashboard';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Calendar/Calendar';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import {
  loginUser,
  selectIsLoggedIn,
  selectUser,
} from './redux/slices/auth/authSlice';
import { auth } from './firebase/firebaseConfig';
import './i18n';
import {
  toggleDarkMode,
  selectIsDarkMode,
  setDarkMode,
} from './redux/slices/darkMode/darkModeSlice.ts';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import AuthModal from './components/Auth/AuthModal';

const App: FC = () => {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      dispatch(setDarkMode(true));
    }

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <Header
          isLoggedIn={isLoggedIn}
          userName={user?.name}
          toggleDarkMode={() => dispatch(toggleDarkMode())}
        />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-1 p-5 min-h-screen bg-white dark:bg-gray-900 transition duration-300">
            <Routes>
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/students"
                element={<ProtectedRoute element={<Students />} />}
              />
              <Route
                path="/subjects"
                element={<ProtectedRoute element={<Subjects />} />}
              />
              <Route
                path="/calendar"
                element={<ProtectedRoute element={<Calendar />} />}
              />
              <Route
                path="/settings"
                element={<ProtectedRoute element={<Settings />} />}
              />
            </Routes>
          </main>
        </div>
      </div>

      <AuthModal isOpen={!isLoggedIn && !loading} onClose={() => {}} />
    </div>
  );
};

export default App;
