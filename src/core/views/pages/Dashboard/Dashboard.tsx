import React from 'react';
import FarmLocations from '../FarmLocations/FarmLocations';
import CurrentWeather from '../../containers/CurrentWeather/CurrentWeather';
import Tasks from '../../containers/Tasks/Tasks';
import Plants from '../../containers/Plants/Plants';

const Dashboard: React.FC = () => {
  return (
    <>
      <CurrentWeather />
      <FarmLocations/>
      <Tasks />
      <Plants />
    </>
  );
};

export default Dashboard;

/*
import TurnoverGraph from '../../containers/TurnoverGraph/TurnoverGraph';
import turnoverStore from '../../../stores/TurnoverStore/TurnoverStore';
      {/* <TurnoverGraph data={turnoverStore.turnovers} width={500} height={300} />
      <ButtonContainer {...buttonContainerData} />*/