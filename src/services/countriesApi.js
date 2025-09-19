import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

// --- Para la lista principal (HomePage) ---
let cachedCountriesList = null;

const transformCountryListData = (country, index) => {
  if (!country) return null;
  return {
    name: country.name?.common || `País ${index + 1}`,
    population: country.population || 0,
    region: country.region || 'No disponible',
    capital: Array.isArray(country.capital) ? country.capital.join(', ') : 'No disponible',
    flag: country.flags?.png || country.flags?.svg,
  };
};

export const fetchCountries = async (force = false) => {
  if (cachedCountriesList && !force) {
    console.log('✅ Devolviendo lista de países desde caché');
    return cachedCountriesList;
  }

  try {
    // SOLUCIÓN: Se elimina el parámetro `fields` para evitar el error 400.
    // Se pide el set de datos completo, lo cual es más robusto en este entorno.
    const url = `${API_BASE_URL}/all?fields=name,flags,capital,population,region`;
    console.log(force ? '♻️ Forzando recarga de lista de países (full data).' : '🚀 Iniciando fetch de lista de países (full data).');
    
    const response = await axios.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      cachedCountriesList = null;
      throw new Error('La API no devolvió datos válidos para la lista');
    }
    
    const transformedData = data.map(transformCountryListData).filter(Boolean);
    
    console.log('✨ Lista de países transformada y cacheada exitosamente');
    cachedCountriesList = transformedData;
    return transformedData;
    
  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      const details = typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : error.response.data;
      errorMessage = `Error HTTP: ${error.response.status} - ${error.response.statusText} - Detalles: ${details}`;
    }
    console.error('💥 Error detallado al obtener lista de países:', { message: errorMessage, stack: error.stack });
    cachedCountriesList = null;
    throw new Error(`No se pudieron cargar los países: ${errorMessage}`);
  }
};


// --- Para la página de detalles (CountryDetailPage) ---

const transformCountryDetailData = (country) => {
    if (!country) return null;

    let currencies = 'No disponible';
    if (country.currencies && typeof country.currencies === 'object') {
      currencies = Object.values(country.currencies).map(curr => curr.name || 'Desconocida').join(', ');
    }
    
    let languages = 'No disponible';
    if (country.languages && typeof country.languages === 'object') {
      languages = Object.values(country.languages).join(', ');
    }

    let nativeName = 'No disponible';
    if (country.name?.nativeName && typeof country.name.nativeName === 'object') {
      const firstNative = Object.values(country.name.nativeName)[0];
      nativeName = firstNative?.common || firstNative?.official || country.name?.common;
    } else {
      nativeName = country.name?.common;
    }

    return {
      name: country.name?.common,
      officialName: country.name?.official,
      nativeName: nativeName || 'No disponible',
      population: country.population || 0,
      region: country.region || 'No disponible',
      subregion: country.subregion || 'No disponible',
      capital: Array.isArray(country.capital) ? country.capital.join(', ') : 'No disponible',
      flag: country.flags?.png || country.flags?.svg,
      tld: Array.isArray(country.tld) ? country.tld[0] : 'No disponible',
      currencies: currencies,
      languages: languages,
      borders: country.borders || [],
      cca3: country.cca3 || ''
    };
}

export const fetchCountryByName = async (name) => {
  try {
    console.log(`🚀 Buscando detalles para: ${name}`);
    const url = `${API_BASE_URL}/name/${name}?fullText=true`;
    const response = await axios.get(url);
    
    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error(`No se encontró el país "${name}"`);
    }
    
    const countryData = response.data[0];
    const transformedData = transformCountryDetailData(countryData);

    console.log(`✨ Detalles de ${name} obtenidos y transformados.`);
    return transformedData;

  } catch (error) {
    let errorMessage = error.message;
    if (error.response) {
      const details = typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : error.response.data;
      errorMessage = `Error HTTP: ${error.response.status} - ${error.response.statusText} - Detalles: ${details}`;
    }
    console.error(`💥 Error obteniendo detalles para ${name}:`, { message: errorMessage, stack: error.stack });
    throw new Error(`No se pudieron cargar los detalles del país: ${errorMessage}`);
  }
};

export const fetchCountriesByCodes = async (codes) => {
  if (!codes || codes.length === 0) {
    return [];
  }
  try {
    console.log(`🚀 Buscando países por códigos: ${codes.join(',')}`);
    const url = `${API_BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,cca3`;
    const response = await axios.get(url);
    
    if (!Array.isArray(response.data)) {
        return [];
    }

    const borderCountries = response.data.map(c => ({ name: c.name.common, cca3: c.cca3 }));
    console.log(`✨ Países fronterizos obtenidos: ${borderCountries.length}`);
    return borderCountries;

  } catch (error) {
    console.error(`💥 Error obteniendo países por código:`, error);
    return [];
  }
};
