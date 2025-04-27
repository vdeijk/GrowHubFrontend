import React from 'react';
import MapSectionContainer from '../../containers/MapSectionContainer/MapSectionContainer';
import CurrentWeatherContainer from '../../containers/CurrentWeatherContainer/CurrentWeatherContainer';
import AgriTasksContainer from '../../containers/AgriTasksContainer/AgriTasksContainer';
import YourCropsContainer from '../../containers/YourCropsContainer/YourCropsContainer';

const DashboardPage: React.FC = () => {
  return (
    <>
      <CurrentWeatherContainer />
      <MapSectionContainer />
      <AgriTasksContainer />
      <YourCropsContainer />
    </>
  );
};

export default DashboardPage;
