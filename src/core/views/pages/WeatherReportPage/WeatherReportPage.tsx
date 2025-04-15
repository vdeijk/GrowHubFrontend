import React from 'react';
import styles from './WeatherReportPage.module.css';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../../stores/WeatherStore/WeatherStore';
import TextWithBoldSpan from '../../reusables/TextWithBoldSpan/TextWithBoldSpan';
import Heading from '../../reusables/Heading/Heading';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const WeatherReportPage: React.FC = observer(() => {
  const forecast = weatherStore.weatherForecast?.forecastday || [];

  const children = (
    <>
      <Heading
        level={6}
        text="7-Day Weather Forecast"
        customStyles={{ marginBottom: '2rem' }}
      />
      <h4 className={styles.h4}>The Hague, South Holland</h4>
      <div className={styles.forecast}>
        {forecast.map((day, index) => (
          <div key={index} className={styles.forecast__day}>
            <h5>{new Date(day.date).toLocaleDateString()}</h5>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className={styles.weather__icon}
            />
            <h3>{day.day.avgtemp_c}°C</h3>
            <div>
              <TextWithBoldSpan
                textWithBoldSpanData={{
                  label: 'Max Temp',
                  boldSpan: `${day.day.maxtemp_c}°C`,
                }}
              />
              <TextWithBoldSpan
                textWithBoldSpanData={{
                  label: 'Min Temp',
                  boldSpan: `${day.day.mintemp_c}°C`,
                }}
              />
              <TextWithBoldSpan
                textWithBoldSpanData={{
                  label: 'Rain Chance',
                  boldSpan: `${day.day.daily_chance_of_rain}%`,
                }}
              />
            </div>
          </div>
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

export default WeatherReportPage;
