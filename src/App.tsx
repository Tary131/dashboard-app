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
import { setUser } from './redux/auth/authSlice';
import { selectIsLoggedIn } from './redux/selectors';
import { auth } from './firebase/firebaseConfig';
import './i18n';
import {
  toggleDarkMode,
  selectIsDarkMode,
  setDarkMode,
} from './redux/darkMode/darkModeSlice.ts';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import AuthModal from './components/Auth/AuthModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from 'firebase/auth';
import LoadingSpinner from './components/custom/LoadingSpinner.tsx';

const App: FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      dispatch(setDarkMode(true));
    }

    const unsubscribe = auth.onAuthStateChanged((_user: User | null) => {
      setLoading(true);
      if (_user) {
        dispatch(
          setUser({
            id: _user.uid,
            email: _user.email || '',
            name: _user.displayName || '',
          })
        );
      } else {
        dispatch(setUser(null));
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <Header
          isLoggedIn={isLoggedIn}
          toggleDarkMode={() => dispatch(toggleDarkMode())}
        />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-1 p-5 min-h-screen bg-white dark:bg-gray-900 transition duration-300">
            <Routes>
              {[
                { path: '/dashboard', component: <Dashboard /> },
                { path: '/students', component: <Students /> },
                { path: '/subjects', component: <Subjects /> },
                { path: '/calendar', component: <Calendar /> },
                { path: '/settings', component: <Settings /> },
              ].map(({ path, component }) => (
                <Route
                  key={path}
                  path={path}
                  element={<ProtectedRoute element={component} />}
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>

      <AuthModal isOpen={!isLoggedIn && !loading} onClose={() => {}} />
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} />
    </div>
  );
};

export default App;
