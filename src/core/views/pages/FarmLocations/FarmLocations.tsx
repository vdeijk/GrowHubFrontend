import React from 'react';
import styles from './FarmLocations.module.css';
import Map from '../../containers/Map/Map';
import Heading from '../../reusables/Heading/Heading';

const FarmLocations: React.FC = () => {
  return (
    <div className={styles.container}>
      <Heading level={6} text="Farm Locations" />
      <Map />
    </div>
  );
};

export default FarmLocations;
