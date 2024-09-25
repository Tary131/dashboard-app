import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Students from './components/Students/Students.tsx';
import Subjects from './components/Subjects/SubjectDashboard.tsx';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Calendar/Calendar.tsx';
import Settings from './components/Settings/Settings.tsx';
import Header from './components/Header/Header.tsx';
import { useAppSelector, useAppDispatch } from './redux/hooks.ts';
import { loginUser } from './redux/slices/auth/authSlice';
import { auth } from './firebase/firebaseConfig';

const App: FC = () => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
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
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header isLoggedIn={isLoggedIn} userName={user?.name} />

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
  );
};

export default App;
