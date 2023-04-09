import React, { useState, useEffect } from "react";
import {
  WiSnow,
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiRain,
  WiThunderstorm,
} from "react-icons/wi/index.js";

// Weather component takes latitude and longitude as props
const Weather = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch weather data whenever latitude and longitude change
  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0bb5173502f54f5a0f4f4e2dedb2998a&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.main.temp); // Set the temperature state
          setWeather(data.weather[0].main); // Set the weather state
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [latitude, longitude]);

  // Function to render the appropriate weather icon based on the weather state
  const renderWeatherIcon = () => {
    switch (weather) {
      case "Clear":
        return <WiDaySunny size="1.5em" color="orange" />;
      case "Clouds":
        return <WiCloud size="1.5em" color="gray" />;
      case "Snow":
        return <WiSnow size="1.5em" color="blue" />;
      case "Rain":
      case "Drizzle":
        return <WiRain size="1.5em" color="blue" />;
      case "Thunderstorm":
        return <WiThunderstorm size="1.5em" color="red" />;
      default:
        return <WiCloudy size="1.5em" color="gray" />;
    }
  };

  return (
    <div>
      {temperature !== null && (
        <span>
          Temperature: {temperature.toFixed(1)}°C {renderWeatherIcon()}
        </span>
      )}
    </div>
  );
};

export default Weather;
