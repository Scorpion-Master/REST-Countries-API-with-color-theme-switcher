import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const formatPopulation = (population) => {
    if (!population || population === 0) return 'No disponible';
    return population.toLocaleString('es-ES');
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleCardClick = () => {
    navigate(`/country/${country.name}`);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Flag Section - Más pequeña */}
      <div className="h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="text-gray-400 text-center p-3">
            <span className="text-xs">Bandera no disponible</span>
          </div>
        ) : (
          <img
            src={country.flag}
            alt={`Bandera de ${country.name}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>
      
      {/* Content Section - Más compacta */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {country.name || 'Nombre no disponible'}
        </h3>
        
        <div className="space-y-1 text-xs">
          <div className="flex">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Población:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {formatPopulation(country.population)}
            </span>
          </div>
          
          <div className="flex">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Región:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {country.region || 'No disponible'}
            </span>
          </div>
          
          <div className="flex">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Capital:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {country.capital || 'No disponible'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
