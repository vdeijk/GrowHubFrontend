import React from 'react';
import turnoverStore from '../../../stores/TurnoverStore';
//import UpcomingWeather from '../../containers/UpcomingWeather/UpcomingWeather';
import CurrentWeather from '../../containers/CurrentWeather/CurrentWeather';
import Tasks from '../../containers/Tasks/Tasks';
import Appointments from '../../containers/Appointments/Appointments';
import Plants from '../../containers/Plants/Plants';
import TurnoverGraph from '../../containers/TurnoverGraph/TurnoverGraph';
const Dashboard: React.FC = () => {
  return (
    <>
      <CurrentWeather />
      {/* <UpcomingWeather /> */}
      <Tasks />
      <Appointments />
      <TurnoverGraph data={turnoverStore.turnovers} width={500} height={300} />
      <Plants />
    </>
  );
};

export default Dashboard;
