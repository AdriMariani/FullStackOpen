import React from 'react';

const CountryList = ( { countries, buttonClick } ) => {
  return countries.map(country => { 
    return ( 
      <p key={country.name}>
        {country.name} <button onClick={buttonClick} country={country.name}>Show</button> 
      </p>    
    )
  })
}

export default CountryList