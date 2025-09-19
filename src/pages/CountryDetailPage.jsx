import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { fetchCountryByName, fetchCountriesByCodes } from '../services/countriesApi';

function CountryDetailPage({ darkMode, toggleDarkMode }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPopulation = (population) => {
    if (!population) return 'No disponible';
    return population.toLocaleString('es-ES');
  };

  const loadData = async (countryName) => {
    try {
      setLoading(true);
      setError(null);
      setCountry(null);
      setBorderCountries([]);

      // 1. Fetch the main country's details
      const countryData = await fetchCountryByName(countryName);
      setCountry(countryData);

      // 2. If it has borders, fetch the border country names
      if (countryData && countryData.borders && countryData.borders.length > 0) {
        const borderData = await fetchCountriesByCodes(countryData.borders);
        setBorderCountries(borderData);
      }

    } catch (err) {
      console.error('❌ Error cargando detalles del país:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      loadData(name);
    }
    window.scrollTo(0, 0);
  }, [name]);

  const handleBack = () => {
    navigate('/');
  };

  const handleBorderCountryClick = (borderCountryName) => {
    navigate(`/country/${borderCountryName}`);
  };

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-16">
          <button
            onClick={handleBack}
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 shadow-md rounded-lg text-gray-900 dark:text-white hover:shadow-lg transition-shadow duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} onRetry={() => loadData(name)} />
        ) : !country ? (
          <div className="text-center">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              País no encontrado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-lg">
                <img
                  src={country.flag}
                  alt={`Bandera de ${country.name}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  style={{ aspectRatio: '3/2' }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {country.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Native Name:</strong> <span className="text-gray-600 dark:text-gray-400">{country.nativeName}</span></p>
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Population:</strong> <span className="text-gray-600 dark:text-gray-400">{formatPopulation(country.population)}</span></p>
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Region:</strong> <span className="text-gray-600 dark:text-gray-400">{country.region}</span></p>
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Sub Region:</strong> <span className="text-gray-600 dark:text-gray-400">{country.subregion}</span></p>
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Capital:</strong> <span className="text-gray-600 dark:text-gray-400">{country.capital}</span></p>
                </div>

                <div className="space-y-3">
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Top Level Domain:</strong> <span className="text-gray-600 dark:text-gray-400">{country.tld}</span></p>
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Currencies:</strong> <span className="text-gray-600 dark:text-gray-400">{country.currencies}</span></p>
                  <p><strong className="font-semibold text-gray-900 dark:text-white">Languages:</strong> <span className="text-gray-600 dark:text-gray-400">{country.languages}</span></p>
                </div>
              </div>

              {borderCountries.length > 0 && (
                <div className="pt-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <strong className="font-semibold text-gray-900 dark:text-white flex-shrink-0 mt-1">
                      Border Countries:
                    </strong>
                    <div className="flex flex-wrap gap-2">
                      {borderCountries.map((borderCountry) => (
                        <button
                          key={borderCountry.cca3}
                          onClick={() => handleBorderCountryClick(borderCountry.name)}
                          className="px-4 py-1 bg-white dark:bg-gray-800 shadow-sm rounded text-gray-900 dark:text-white hover:shadow-md transition-shadow duration-200 text-sm"
                        >
                          {borderCountry.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default CountryDetailPage;
