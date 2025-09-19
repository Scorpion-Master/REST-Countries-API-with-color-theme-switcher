import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error al cargar los países
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Hubo un problema al conectar con la API de RestCountries.
        </p>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-6 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg max-w-md mx-auto">
            Error: {error}
          </p>
        )}
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
