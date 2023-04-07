import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "0bb5173502f54f5a0f4f4e2dedb2998a";

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        setLoading(false);
      }
    }
    fetchWeather();
  }, [latitude, longitude, API_KEY]);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!weather) {
    return <span>Error fetching weather data</span>;
  }

  const { main, weather: weatherConditions } = weather;
  const temperature = main.temp.toFixed(1);
  const iconCode = weatherConditions[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <>
      <img src={iconUrl} alt="Weather icon" />
      <span>{temperature}°C</span>
    </>
  );
};

export default WeatherInfo;
