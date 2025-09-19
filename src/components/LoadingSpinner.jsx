import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando países...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
