import React from 'react';
import styles from './WeatherReportPage.module.css';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../../stores/CurrentWeatherStore/WeatherStore';
import TextWithBoldSpan from '../../reusables/TextWithBoldSpan/TextWithBoldSpan';
import Heading from '../../reusables/Heading/Heading';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import fieldsStore from '../../../stores/FieldsStore/FieldsStore';

const WeatherReportPage: React.FC = observer(() => {
  const options = fieldsStore.locations.map((location) => ({
    value: location.id?.toString() || '',
    label: location.name,
  }));

  const weatherForecast = weatherStore.weatherData?.forecast.forecastday;

  const children = (
    <>
      <div className={styles.searchBar}>
        <Dropdown
          label="Choose Field"
          value={weatherStore.selectedLocation?.id?.toString() || ''}
          onChange={(id) => weatherStore.setLocation(id)}
          options={options}
          aria-label="Choose Field"
        />
      </div>
      <div className={styles.content}>
        <Heading
          level={6}
          text={`${weatherForecast?.length}-day Weather Forecast`}
          customStyles={{ marginBottom: '2rem' }}
        />
        <Heading
          level={4}
          text={weatherStore.locationFullName}
          customStyles={{ marginBottom: '2rem' }}
        />
        <div className={styles.forecast}>
          {/* @ts-ignore */}
          {weatherForecast?.map((day, index) => (
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
