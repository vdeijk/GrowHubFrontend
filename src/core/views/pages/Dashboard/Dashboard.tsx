import React from 'react';
import MapSection from '../../containers/MapSection/MapSection';
import CurrentWeather from '../../containers/CurrentWeather/CurrentWeather';
import Tasks from '../../containers/Tasks/Tasks';
import Plants from '../../containers/Plants/Plants';

const Dashboard: React.FC = () => {
  return (
    <>
      <CurrentWeather />
      <MapSection />
      <Tasks />
      <Plants />
    </>
  );
};

export default Dashboard;
