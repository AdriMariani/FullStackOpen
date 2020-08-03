import React from 'react';
import Country from './Country';
import CountryList from './CountryList'

const SearchResults = ( { countries, buttonClick } ) => {
  if(countries.length === 1)
    return <Country country={countries[0]}/>
  else if (countries.length === 0)
    return <p>No matches found, specify another filter.</p>
  else if (countries.length > 10)
    return <p>Too many matches, specify another filter.</p>
  else
    return <CountryList countries={countries} buttonClick={buttonClick}/>
}

export default SearchResults