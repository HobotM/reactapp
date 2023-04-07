import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Get the location ID from MetaWeather
        const locationResponse = await axios.get(
          `${proxyUrl}https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`
        );

        if (locationResponse.data && locationResponse.data.length > 0) {
          const locationId = locationResponse.data[0].woeid;

          // Get the weather data using the location ID
          const weatherResponse = await axios.get(
            `${proxyUrl}https://www.metaweather.com/api/location/${locationId}/`
          );

          setWeather(weatherResponse.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        setLoading(false);
      }
    }

    fetchWeather();
  }, [latitude, longitude]);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!weather) {
    return <span>Error fetching weather data</span>;
  }

  const weatherConditions = weather.consolidated_weather[0];
  const temperature = weatherConditions.the_temp.toFixed(1);
  const iconCode = weatherConditions.weather_state_abbr;
  const iconUrl = `https://www.metaweather.com/static/img/weather/${iconCode}.svg`;

  return (
    <>
      <img src={iconUrl} alt="Weather icon" width="40" height="40" />
      <span>{temperature}°C</span>
    </>
  );
};

export default WeatherInfo;
