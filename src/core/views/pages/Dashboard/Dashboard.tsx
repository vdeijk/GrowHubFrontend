import React, { Suspense } from 'react';
import turnoverStore from '../../../stores/TurnoverStore';
import UpcomingWeather from '../../containers/UpcomingWeather/UpcomingWeather';

const LazyComponents = {
  CurrentWeather: React.lazy(
    () => import('../../containers/CurrentWeather/CurrentWeather'),
  ),
  Tasks: React.lazy(() => import('../../containers/Tasks/Tasks')),
  Appointments: React.lazy(
    () => import('../../containers/Appointments/Appointments'),
  ),
  Plants: React.lazy(() => import('../../containers/Plants/Plants')),
  UpcomingWeather: React.lazy(
    () => import('../../containers/UpcomingWeather/UpcomingWeather'),
  ),
  TurnoverGraph: React.lazy(
    () => import('../../containers/TurnoverGraph/TurnoverGraph'),
  ),
};

const Dashboard: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default Dashboard;
