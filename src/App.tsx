import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Students from './components/Students/Students.tsx';
import Subjects from './components/Subjects/SubjectDashboard.tsx';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Calendar/Calendar.tsx';
import Settings from './components/Settings/Settings.tsx';
import Header from './components/Header/Header.tsx';
import { useAppSelector } from './redux/hooks.ts';

const App: FC = () => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Header at the top */}
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
