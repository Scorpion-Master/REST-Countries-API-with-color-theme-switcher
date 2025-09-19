import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import SearchAndFilter from '../components/SearchAndFilter';
import CountryGrid from '../components/CountryGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { fetchCountries } from '../services/countriesApi';

function HomePage({ darkMode, toggleDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const loadCountries = async (force = false) => {
    try {
      console.log('🌍 Cargando países...');
      setLoading(true);
      setError(null);
      
      const countriesData = await fetchCountries(force);
      console.log('✅ Países cargados exitosamente:', countriesData.length);
      
      setCountries(countriesData);
    } catch (err) {
      console.error('❌ Error en HomePage al cargar países:', err);
      setError(err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    if (countries.length === 0) {
      return [];
    }
    
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        regions={regions}
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage error={error} onRetry={() => loadCountries(true)} />
      ) : (
        <CountryGrid countries={filteredCountries} />
      )}
    </>
  );
}

export default HomePage;
