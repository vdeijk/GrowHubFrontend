import React from 'react';
import styles from './CurrentWeather.module.css';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../../stores/WeatherStore/WeatherStore';
import TextWithBoldSpan from '../../reusables/TextWithBoldSpan/TextWithBoldSpan';
import { TextWithBoldSpanData } from '../../../../auxiliary/interfaces/TextWithBoldSpanData';
import Heading from '../../reusables/Heading/Heading';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const CurrentWeather: React.FC = observer(() => {
  const weather = weatherStore.weather;

  const textsWithBoldSpan: TextWithBoldSpanData[] = [
    { label: 'Humidity', boldSpan: `${weather?.current.humidity}%` },
    { label: 'Wind Speed', boldSpan: `${weather?.current.wind_kph} kph` },
  ];

  const children = (
    <>
      <Heading level={6} text="Current Weather"></Heading>
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
    </>
  );

  return (
    <section className={styles.weather}>
      <LoadingWrapper isLoading={weatherStore.isLoading}>
        {children}
      </LoadingWrapper>
    </section>
  );
});

export default CurrentWeather;
