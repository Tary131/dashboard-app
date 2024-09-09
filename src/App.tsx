import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const userName = 'Taras';

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        userName={isLoggedIn ? userName : 'Guest'}
      />

      {/* Main content with Sidebar */}
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-1 p-5">
          <h1 className="text-2xl font-semibold">Main Content Area</h1>
          {/* Additional content here */}
        </main>
      </div>
    </div>
  );
};

export default App;
