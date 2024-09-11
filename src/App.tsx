import { useState, ReactElement, FC } from 'react';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import Students from './components/Students/Students.tsx';

type PageKey = 'dashboard' | 'subjects' | 'students' | 'settings';
const Dashboard: FC = () => <div>Dashboard Page</div>;
const Subjects: FC = () => <div>Subjects Page</div>;
const Settings: FC = () => <div>Settings Page</div>;
const pages: Record<PageKey, ReactElement> = {
  students: <Students />,
  dashboard: <Dashboard />,
  subjects: <Subjects />,
  settings: <Settings />,
};
const pageTitles: Record<PageKey, string> = {
  dashboard: 'Dashboard',
  subjects: 'Subjects',
  students: 'Students',
  settings: 'Settings',
};

const App: FC = () => {
  const [activePage, setActivePage] = useState<PageKey>('students');
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <Sidebar setActivePage={setActivePage} />
        <main className="flex-1 p-5">
          <h1 className="text-2xl font-semibold flex justify-center">
            {pageTitles[activePage]}
          </h1>
          {pages[activePage]}
        </main>
      </div>
    </div>
  );
};

export default App;
