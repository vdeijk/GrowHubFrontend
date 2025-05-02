import React from 'react';
import MapSectionContainer from '../../containers/FieldsContainer/FieldsContainer';
import CurrentWeatherContainer from '../../containers/CurrentWeatherContainer/CurrentWeatherContainer';
import AgriTasksContainer from '../../containers/AgriTasksContainer/AgriTasksContainer';
import YourCropsContainer from '../../containers/BatchesContainer/BatchesContainer';

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
