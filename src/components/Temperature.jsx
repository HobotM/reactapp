import React from 'react';

const Temperature = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = React.useState(null);

  React.useEffect(() => {
    const apiKey = "0bb5173502f54f5a0f4f4e2dedb2998a";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    const fetchTemperature = async () => {
      try {
        const response = await fetch(weatherURL);
        const weatherData = await response.json();
        const temp = weatherData.main.temp;
        setTemperature(temp);
      } catch (error) {
        console.error("Failed to fetch temperature data:", error);
        setTemperature("N/A");
      }
    };

    if (latitude && longitude) {
      fetchTemperature();
    }

  }, [latitude, longitude]);

  return (
    <div>
      {temperature !== null ? (
        <p>Temperature: {temperature}°C</p>
      ) : (
        <p>Loading temperature...</p>
      )}
    </div>
  );
};

export default Temperature;
