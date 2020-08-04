import React from 'react';
import Country from './Country';
import CountryList from './CountryList';
import Weather from './Weather';

const SearchResults = ( { results, buttonClick, weather } ) => {
  if(results === null)
    return <p>No matches found, specify another filter.</p>
  else if (results === undefined)
    return <p>Too many matches, specify another filter.</p>
  else if (results.length === 1)
    return (
      <div>
        <Country country={results[0]}/>
        <Weather weather={weather}/>
      </div>
    )
  else
    return <CountryList countries={results} buttonClick={buttonClick}/>
}

export default SearchResults;