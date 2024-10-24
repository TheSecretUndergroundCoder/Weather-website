import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=your_city&appid=your_api_key&units=metric');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main: { temp }, weather: [{ description, icon }] } = weatherData;

  let weatherIcon;
  if (icon.includes('sun')) {
    weatherIcon = <FontAwesomeIcon icon={faSun} size="2x" />;
  } else if (icon.includes('cloud')) {
    weatherIcon = <FontAwesomeIcon icon={faCloud} size="2x" />;
  } else if (icon.includes('rain')) {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} size="2x" />;
  } else if (icon.includes('snow')) {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} size="2x" />;
  } else {
    weatherIcon = <div>No icon available</div>;
  }

  return (
    <div className="weather-info">
      <h1>{name}</h1>
      <div className="weather-icon">{weatherIcon}</div>
      <p>{temp}°C</p>
      <p>{description}</p>
    </div>
  );
};

ReactDOM.render(<WeatherApp />, document.getElementById('app'));
