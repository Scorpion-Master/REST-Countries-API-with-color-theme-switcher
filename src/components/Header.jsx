import React from 'react';
import { Moon, Sun } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Where in the world?
          </h1>
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-sm font-medium">Dark Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
