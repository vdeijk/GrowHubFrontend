import React from 'react';
import MapSectionContainer from '../../containers/MapSectionContainer/MapSectionContainer';
import CurrentWeatherContainer from '../../containers/CurrentWeatherContainer/CurrentWeatherContainer';
import AgriTasksContainer from '../../containers/AgriTasksContainer/AgriTasksContainer';
import CropsContainer from '../../containers/CropsContainer/CropsContainer';

const DashboardPage: React.FC = () => {
  return (
    <>
      <CurrentWeatherContainer />
      <MapSectionContainer />
      <AgriTasksContainer />
      <CropsContainer />
    </>
  );
};

export default DashboardPage;
