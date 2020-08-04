import React from 'react';

const Weather = ( { weather } ) => {
  if (weather === undefined)
    return <p>Loading...</p>

  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ];
  const i = Math.floor((weather.wind.deg + 11.25) / 22.5);
  const windDirection = `direction ${directions[i % 16]}`;


  return (
    <div>    
      <h3>Weather In {weather.name}</h3>
      <p>
        <strong>Temperature: </strong>
        {Math.round(weather.main.temp - 273.15)} °C
      </p>
      <img 
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
        alt='icon'
        width='100'
        height='100'
      />
      <p>
        <strong>Wind: </strong>
        {Math.round(weather.wind.speed)} kph {windDirection}
      </p>
    </div>
  )
}

export default Weather;