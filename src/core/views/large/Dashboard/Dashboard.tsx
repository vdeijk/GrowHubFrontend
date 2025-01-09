import React, { Suspense } from 'react';
import styles from './Dashboard.module.css';
import turnoverStore from '../../../stores/TurnoverStore';
import UpcomingWeather from '../../medium/UpcomingWeather/UpcomingWeather';

const LazyComponents = {
  CurrentWeather: React.lazy(
    () => import('../../medium/CurrentWeather/CurrentWeather'),
  ),
  Tasks: React.lazy(() => import('../../medium/Tasks/Tasks')),
  Appointments: React.lazy(
    () => import('../../medium/Appointments/Appointments'),
  ),
  Plants: React.lazy(() => import('../../medium/Plants/Plants')),
  UpcomingWeather: React.lazy(
    () => import('../../medium/UpcomingWeather/UpcomingWeather'),
  ),
  TurnoverGraph: React.lazy(
    () => import('../../medium/TurnoverGraph/TurnoverGraph'),
  ),
};

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Suspense fallback={<div>Loading weather data...</div>}>
        <LazyComponents.CurrentWeather />
        <UpcomingWeather />
      </Suspense>
      <Suspense fallback={<div>Loading taskmanager data...</div>}>
        <LazyComponents.Tasks />
      </Suspense>
      <Suspense fallback={<div>Loading calendar data...</div>}>
        <LazyComponents.Appointments />
      </Suspense>
      <Suspense fallback={<div>Loading statistics data...</div>}>
        <LazyComponents.TurnoverGraph
          data={turnoverStore.turnovers}
          width={500}
          height={300}
        />
      </Suspense>
      <Suspense fallback={<div>Loading plant database data...</div>}>
        <LazyComponents.Plants />
      </Suspense>
    </div>
  );
};

export default Dashboard;
