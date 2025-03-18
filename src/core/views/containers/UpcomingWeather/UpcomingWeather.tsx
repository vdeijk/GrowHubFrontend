import React from 'react';
import styles from './UpcomingWeather.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';

const UpcomingWeather: React.FC = observer(() => {
  return (
    <section className={styles.upcomingWeather}>
      <Heading level={6} text="Upcoming Weather"></Heading>
    </section>
  );
});

export default UpcomingWeather;
