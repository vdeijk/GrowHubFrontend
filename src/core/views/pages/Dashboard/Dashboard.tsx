import React from 'react';
import turnoverStore from '../../../stores/TurnoverStore/TurnoverStore';
import FarmLocations from '../FarmLocations/FarmLocations';
import CurrentWeather from '../../containers/CurrentWeather/CurrentWeather';
import Tasks from '../../containers/Tasks/Tasks';
import Plants from '../../containers/Plants/Plants';
import TurnoverGraph from '../../containers/TurnoverGraph/TurnoverGraph';

const Dashboard: React.FC = () => {
  return (
    <>
      <CurrentWeather />
      <FarmLocations/>
      <Tasks />
      <TurnoverGraph data={turnoverStore.turnovers} width={500} height={300} />
      <Plants />
    </>
  );
};

export default Dashboard;
