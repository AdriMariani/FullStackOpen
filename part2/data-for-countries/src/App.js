import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import SearchResults from './components/SearchResults'

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, []);

  const handleSearchChange = event => setSearch(event.target.value);

  const filteredCountries = countries.filter(country => { 
      return country.name.toLowerCase().startsWith(search.toLowerCase());
    });

  return (
    <div>
      <Search value={search} handleChange={handleSearchChange}/>
      <SearchResults countries={filteredCountries}/>
    </div>
  );
}

export default App;
