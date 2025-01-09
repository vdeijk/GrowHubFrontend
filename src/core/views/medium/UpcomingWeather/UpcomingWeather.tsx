import React from 'react';
import styles from './UpcomingWeather.module.css';
import { observer } from 'mobx-react-lite';

const UpcomingWeather: React.FC = observer(() => {
  return (
    <section className={styles.upcomingWeather}>
      <h6 className={styles.upcomingWeather__h6}>Upcoming Weather</h6>
    </section>
  );
});

export default UpcomingWeather;
