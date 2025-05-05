import React from 'react';
import MapSectionContainer from '../../containers/FieldsContainer/FieldsContainer';
import CurrentWeatherContainer from '../../containers/WeatherContainer/WeatherContainer';
import AgriTasksContainer from '../../containers/TasksContainer/TasksContainer';
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
