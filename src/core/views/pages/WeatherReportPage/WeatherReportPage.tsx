import React from 'react';
import styles from './WeatherReportPage.module.css';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../../stores/derived/WeatherStore/WeatherStore';
import TextWithBoldSpan from '../../reusables/TextWithBoldSpan/TextWithBoldSpan';
import Heading from '../../reusables/Heading/Heading';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import fieldsStore from '../../../stores/derived/FieldsStore/FieldsStore';
import { useTranslation } from 'react-i18next';

const WeatherReportPage: React.FC = observer(() => {
  const { t } = useTranslation();

  const options = fieldsStore.locations.map((location) => ({
    value: location.id?.toString() || '',
    label: location.name || t('weatherReportPage.unknownLocation'),
  }));
  const weatherForecast = weatherStore.weatherData?.forecast.forecastday;

  const children = (
    <>
      <div className={styles.searchBar}>
        <Dropdown
          label={t('weatherReportPage.dropdown.label')}
          value={weatherStore.selectedLocation?.id?.toString() || ''}
          onChange={(id) => weatherStore.setLocation(String(id))}
          options={options}
          aria-label={t('weatherReportPage.dropdown.ariaLabel')}
        />
      </div>
      <div className={styles.content}>
        <Heading
          level={6}
          text={t('weatherReportPage.headings.forecastTitle', {
            count: weatherForecast?.length || 0,
          })}
          customStyles={{ marginBottom: '2rem' }}
        />
        <Heading
          level={4}
          text={t('weatherReportPage.headings.locationTitle', {
            location: weatherStore.locationFullName,
          })}
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
                    label: t('weatherReportPage.textWithBoldSpan.maxTemp'),
                    boldSpan: `${day.day.maxtemp_c}°C`,
                  }}
                />
                <TextWithBoldSpan
                  textWithBoldSpanData={{
                    label: t('weatherReportPage.textWithBoldSpan.minTemp'),
                    boldSpan: `${day.day.mintemp_c}°C`,
                  }}
                />
                <TextWithBoldSpan
                  textWithBoldSpanData={{
                    label: t('weatherReportPage.textWithBoldSpan.rainChance'),
                    boldSpan: `${day.day.daily_chance_of_rain}%`,
                  }}
                />
                <TextWithBoldSpan
                  textWithBoldSpanData={{
                    label: t('weatherReportPage.textWithBoldSpan.humidity'),
                    boldSpan: `${day.day.avghumidity}%`,
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
