import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import SearchResults from './components/SearchResults';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState({city: '', countryCode: ''});
  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, []);

  useEffect(() => {
    if(capital.city === '')
      return
    
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: `${capital.city},${capital.countryCode}`,
          appid: process.env.REACT_APP_API_KEY
        }
      })
      .then(response => setWeather(response.data))
  }, [capital]);

  const handleSearchChange = event => setSearch(event.target.value);
  const changeSearchOnClick = event => setSearch(event.target.attributes.country.value);

  const filteredCountries = countries.filter(country => { 
      return country.name.toLowerCase().startsWith(search.toLowerCase());
    });

  const searchResults = () => {
    if(search.trim() === '' || filteredCountries.length === 0)
      return null;
    else if (filteredCountries.length > 10)
      return undefined;
    else {
      if (filteredCountries.length === 1 && capital.city !== filteredCountries[0].capital) {
        setCapital({
          city: filteredCountries[0].capital,
          countryCode: filteredCountries[0].alpha2Code
        });
      }
      return filteredCountries;
    }
  }

  return (
    <div>
      <Search value={search} handleChange={handleSearchChange}/>
      <SearchResults results={searchResults()} buttonClick={changeSearchOnClick} weather={weather}/>
    </div>
  );
}

export default App;
