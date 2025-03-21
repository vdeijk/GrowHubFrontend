import React, { Suspense } from 'react';
import turnoverStore from '../../../stores/TurnoverStore';
import UpcomingWeather from '../../containers/UpcomingWeather/UpcomingWeather';
import CurrentWeather from '../../containers/CurrentWeather/CurrentWeather';
import Tasks from '../../containers/Tasks/Tasks';
import Appointments from '../../containers/Appointments/Appointments';
import Plants from '../../containers/Plants/Plants';
import TurnoverGraph from '../../containers/TurnoverGraph/TurnoverGraph';
import weatherStore from '../../../stores/WeatherStore';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const Dashboard: React.FC = () => {
  return (
    <>
      <LoadingWrapper isLoading={weatherStore.isLoading}>
        <CurrentWeather />
        <UpcomingWeather />
      </LoadingWrapper>
      <Tasks />
      <Appointments />
      <TurnoverGraph data={turnoverStore.turnovers} width={500} height={300} />
      <Suspense fallback={<div>Loading plant database data...</div>}>
        <Plants />
      </Suspense>
    </>
  );
};

export default Dashboard;
