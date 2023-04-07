import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=metric&appid=394d1b7d66b7971d1c01ab62d5fdb1fe`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const snow = weatherData.current.snow
    ? weatherData.current.snow["1h"]
    : "No snow";
  const temperature = weatherData.current.temp;

  return (
    <div>
      <div>Snow conditions: {snow}</div>
      <div>Temperature: {temperature} °C</div>
    </div>
  );
};

export default WeatherInfo;
