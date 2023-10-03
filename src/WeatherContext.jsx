import { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const updateWeatherInfo = (data) => {
    let MT = Math.round(data.main.temp);
    let FL = Math.round(data.main.feels_like);

    const weather = {
      location: `Weather in ${data.name}`,
      temperature: `Temperature: ${MT} C`,
      feelsLike: `Feels Like: ${FL} C`,
      humidity: `Humidity: ${data.main.humidity} %`,
      wind: `Wind: ${data.wind.speed} km/h`,
      condition: `Weather Condition: ${data.weather[0].description}`,
    };

    setWeatherInfo(weather);
  };

  return (
    <WeatherContext.Provider value={{ weatherInfo, updateWeatherInfo }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
