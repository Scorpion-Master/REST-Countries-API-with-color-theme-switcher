import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchAndFilter = ({ searchTerm, setSearchTerm, selectedRegion, setSelectedRegion, regions }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar un país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-none rounded-lg shadow-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Region Filter */}
        <div className="relative w-1/2 sm:w-auto">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-800 border-none rounded-lg shadow-sm px-6 py-4 pr-12 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full sm:w-auto sm:min-w-[200px]"
          >
            <option value="">Filtrar por Región</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
