import React, { useState, useEffect } from "react";
import { WiSnow } from "react-icons/wi";

const Weather = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = useState(null);
  const [snow, setSnow] = useState(false);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0bb5173502f54f5a0f4f4e2dedb2998a&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.main.temp);
          setSnow(data.weather.some((weather) => weather.main === "Snow"));
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [latitude, longitude]);

  return (
    <div>
      {temperature !== null && (
        <span>
          Temperature: {temperature.toFixed(1)}°C{" "}
          {snow && <WiSnow size="1.5em" color="blue" />}
        </span>
      )}
    </div>
  );
};

export default Weather;
