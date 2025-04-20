import React from 'react';
import styles from './CurrentWeatherContainer.module.css';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../../stores/CurrentWeatherStore/WeatherStore';
import TextWithBoldSpan from '../../reusables/TextWithBoldSpan/TextWithBoldSpan';
import { TextWithBoldSpanData } from '../../../../auxiliary/interfaces/TextWithBoldSpanData';
import Heading from '../../reusables/Heading/Heading';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';

const CurrentWeatherContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const weather = weatherStore.weather;

  const textsWithBoldSpan: TextWithBoldSpanData[] = [
    { label: 'Humidity', boldSpan: `${weather?.current.humidity}%` },
    { label: 'Wind Speed', boldSpan: `${weather?.current.wind_kph} kph` },
  ];

  const buttonContainerData = {
    clickHandler: () => navigate('/weatherReportPage'),
    label: 'View Full Report',
  };

  const children = (
    <>
      <Heading
        level={6}
        text="Current Weather"
        customStyles={{ marginBottom: '2rem' }}
      ></Heading>
      <h4 className={styles.h4}>The Hague, South Holland</h4>
      <div className={styles.container}>
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
      <ButtonContainer {...buttonContainerData} />
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

export default CurrentWeatherContainer;
