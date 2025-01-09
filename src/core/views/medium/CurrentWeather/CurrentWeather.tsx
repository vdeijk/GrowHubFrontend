import React, { useEffect } from 'react';
import styles from './CurrentWeather.module.css';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../../stores/WeatherStore';
import TextWithBoldSpan from '../../small/TextWithBoldSpan/TextWithBoldSpan';
import { TextWithBoldSpanData } from '../../../../auxiliary/interfaces/TextWithBoldSpanData';

const CurrentWeather: React.FC = observer(() => {
  const weather = weatherStore.weather;

  useEffect(() => {
    weatherStore.fetchWeather();
  }, []);

  const textsWithBoldSpan: TextWithBoldSpanData[] = [
    { label: 'Humidity', boldSpan: `${weather?.current.humidity}%` },
    { label: 'Wind Speed', boldSpan: `${weather?.current.wind_kph} kph` },
  ];

  return (
    <div className={styles.weather}>
      <h6 className={styles.h6}>Current Weather</h6>
      <h4 className={styles.h4}>The Hague, South Holland</h4>
      <div className={styles.main}>
        <img
          src={weather?.current.condition.icon}
          alt={weather?.current.condition.text}
          className={styles.weather__icon}
        />
        <h2>{weather?.current.temp_c}°C</h2>
      </div>
      <div>
        {textsWithBoldSpan?.map((textWithBoldSpan, index) => (
          <TextWithBoldSpan
            textWithBoldSpanData={textWithBoldSpan}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});

export default CurrentWeather;
