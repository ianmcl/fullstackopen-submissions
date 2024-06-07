import { useState } from 'react';
import axios from 'axios';

function filterCountries(countriesData, query, selectedCountry) {
  if (selectedCountry) {
    return { country: selectedCountry };
  }

  const matchedCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  if (matchedCountries.length > 10) {
    return { message: 'Too many matches, specify another filter.', countries: [] };
  } else if (matchedCountries.length > 1) {
    return { message: '', countries: matchedCountries };
  } else if (matchedCountries.length === 1) {
    return { message: '', country: matchedCountries[0] };
  } else {
    return { message: 'No matches found.', countries: [] };
  }
}

function App() {
  const [query, setQuery] = useState('');
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleInputChange = (event) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);
    setSelectedCountry(null);

    if (inputQuery.trim()) {
      fetchCountries(inputQuery.trim());
    } else {
      setCountriesData([]);
    }
  };

  const fetchCountries = (query) => {
    axios.get(`https://restcountries.com/v3.1/name/${query}`)
      .then(response => {
        setCountriesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
        setCountriesData([]);
      });
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const { message, countries, country } = filterCountries(countriesData, query, selectedCountry);

  return (
    <div className="App">
      <h1>Country Info Viewer</h1>
      <input
        type="text"
        placeholder="Type a country name..."
        value={query}
        onChange={handleInputChange}
      />
      <div className="results">
        {message && <p>{message}</p>}
        {countries && countries.length > 0 && (
          <ul>
            {countries.map(country => (
              <li key={country.name.common} onClick={() => handleCountryClick(country)}>
                {country.name.common}
              </li>
            ))}
          </ul>
        )}
      </div>
      {country && (
        <div className="country-details">
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <p>Languages:</p>
          <ul>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        </div>
      )}
    </div>
  );
}

export default App;
