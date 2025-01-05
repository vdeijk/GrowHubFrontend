import React, { useEffect } from "react";
import styles from "./Weather.module.css";
import { observer } from "mobx-react-lite";
import weatherStore from "../../Stores/WeatherStore";

const Weather: React.FC = observer(() => {
  const weather = weatherStore.weather;

  useEffect(() => {
    weatherStore.fetchWeather();
  }, []);

  const displayWeather = () => {
    if (weather) {
      return (
        <>
          <div className={styles.weather__main}>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className={styles.weather__icon}
            />
            <h2>{weather?.current.temp_c}°C</h2>
          </div>
          <div className={styles.weather__details}>
            <p className={styles.taskDueDate}>
              Humidity:{" "}
              <span className={styles.bold}>{weather?.current.humidity}%</span>
            </p>
            <p className={styles.taskDueDate}>
              Wind Speed:{" "}
              <span className={styles.bold}>
                {weather?.current.wind_kph} kph
              </span>
            </p>
          </div>
        </>
      );
    }
    return <p>Loading weather data...</p>;
  };

  return (
    <div className={styles.weather}>
      <h6 className={styles.weather__h6}>Current Weather</h6>
      <h3 className={styles.weather__h3}>The Hague, South Holland</h3>
      {displayWeather()}
    </div>
  );
});

export default Weather;
