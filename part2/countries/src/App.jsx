import { useState } from 'react';
import axios from 'axios';

function filterCountries(countriesData, query) {
  const matchedCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  if (matchedCountries.length > 10) {
    return { message: 'Too many matches, specify another filter.', countries: [] };
  } else if (matchedCountries.length > 1) {
    return { message: '', countries: matchedCountries };
  } else if (matchedCountries.length === 1) {
    return { message: '', countries: matchedCountries };
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

  const { message, countries } = filterCountries(countriesData, query);

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
        {!selectedCountry && countries && countries.length > 0 && (
          <ul>
            {countries.map(country => (
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleCountryClick(country)}>Show</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedCountry && (
        <div className="country-details">
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>Languages:</p>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
        </div>
      )}
    </div>
  );
}

export default App;
