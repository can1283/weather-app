import React, { useState } from 'react';
import './App.css';
import { useWeather, WeatherProvider } from './WeatherContext';

function App() {
  const [city, setCity] = useState('');
  const { weatherInfo, updateWeatherInfo } = useWeather();

  function getWeather() {
    const apiKey = '0c8390a7bc139d20096131873537d5f7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        updateWeatherInfo(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className='weather-container'>
      <input
        type='text'
        placeholder='Enter city name'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {weatherInfo && (
        <div className='weather-info'>
          <h3>{weatherInfo.location}</h3>
          <p>{weatherInfo.temperature}</p>
          <p>{weatherInfo.feelsLike}</p>
          <p>{weatherInfo.humidity}</p>
          <p>{weatherInfo.wind}</p>
          <p>{weatherInfo.condition}</p>
        </div>
      )}
    </div>
  );
}

function AppWithWeatherProvider() {
  return (
    <WeatherProvider>
      <App />
    </WeatherProvider>
  );
}

export default AppWithWeatherProvider;
