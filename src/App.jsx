import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CountryDetailPage from './pages/CountryDetailPage';
import useDarkMode from './hooks/useDarkMode';

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Routes>
        <Route 
          path="/" 
          element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} 
        />
        <Route 
          path="/country/:name" 
          element={<CountryDetailPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
