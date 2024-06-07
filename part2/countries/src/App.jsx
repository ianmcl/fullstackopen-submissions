import { useState } from 'react';
import axios from 'axios';
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

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
  const [weather, setWeather] = useState(null);

  const handleInputChange = (event) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);
    setSelectedCountry(null);
    setWeather(null);

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

  const fetchWeather = (capital) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeather(null);
      });
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital[0]);
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
          {weather && (
            <div className="weather">
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
