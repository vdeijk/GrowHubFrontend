import React from 'react';
import styles from './WeatherContainer.module.css';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../../stores/derived/WeatherStore/WeatherStore';
import TextWithBoldSpan from '../../reusables/TextWithBoldSpan/TextWithBoldSpan';
import { TextWithBoldSpanData } from '../../../../auxiliary/interfaces/TextWithBoldSpanData';
import Heading from '../../reusables/Heading/Heading';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import { useTranslation } from 'react-i18next';

const WeatherContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();
  const { t } = useTranslation();

  const weather = weatherStore?.weatherData;

  const textsWithBoldSpan: TextWithBoldSpanData[] = [
    {
      label: t('weather.humidity'),
      boldSpan: `${weather?.current?.humidity}%`,
    },
    {
      label: t('weather.windSpeed'),
      boldSpan: `${weather?.current?.wind_kph} kph`,
    },
  ];

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => navigate('/weatherReportPage'),
      label: t('weather.viewFullReport'),
    },
  ];

  const children = (
    <>
      <Heading
        level={6}
        text={t('weather.heading')}
        customStyles={{ marginBottom: '2rem' }}
      ></Heading>
      <h4 className={styles.h4}>{weatherStore.locationFullName}</h4>
      <div className={styles.container}>
        <img
          src={weather?.current?.condition.icon}
          alt={weather?.current?.condition.text}
          className={styles.weather__icon}
        />
        <h2>{weather?.current?.temp_c}°C</h2>
      </div>
      <div>
        {textsWithBoldSpan?.map((textWithBoldSpan, index) => (
          <TextWithBoldSpan
            textWithBoldSpanData={textWithBoldSpan}
            key={index}
          />
        ))}
      </div>
      <ButtonContainer buttons={buttonContainerData} />
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

export default WeatherContainer;
