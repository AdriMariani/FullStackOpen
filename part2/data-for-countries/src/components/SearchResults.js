import React from 'react';
import Country from './Country';

const SearchResults = ( { countries } ) => {
  if(countries.length === 1)
    return <Country country={countries[0]}/>
  else if (countries.length === 0)
    return <p>No matches found, specify another filter.</p>
  else if (countries.length > 10)
    return <p>Too many matches, specify another filter.</p>
  else
    return countries.map(country => <p key={country.name}>{country.name}</p>)
}

export default SearchResults