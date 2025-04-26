import React from 'react';
import MapSectionContainer from '../../containers/MapSectionContainer/MapSectionContainer';
import CurrentWeatherContainer from '../../containers/CurrentWeatherContainer/CurrentWeatherContainer';
import AgriTasksContainer from '../../containers/AgriTasksContainer/AgriTasksContainer';
import CropsDatabaseContainer from '../../containers/CropsDatabaseContainer/CropsDatabaseContainer';
import YourCropsContainer from '../../containers/YourCropsContainer/YourCropsContainer';

const DashboardPage: React.FC = () => {
  return (
    <>
      <CurrentWeatherContainer />
      <MapSectionContainer />
      <AgriTasksContainer />
      <YourCropsContainer />
      <CropsDatabaseContainer />
    </>
  );
};

export default DashboardPage;
