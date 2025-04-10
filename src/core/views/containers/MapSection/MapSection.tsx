import React from 'react';
import styles from './MapSection.module.css';
import Map from '../../reusables/Map/Map';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { useNavigate } from 'react-router-dom';

const MapSection: React.FC = () => {
  const navigate = useNavigate();

  const buttonContainerData = {
    clickHandler: () => navigate('/farmLocations'),
    label: 'View All Locations',
  };

  return (
    <div className={styles.container}>
      <Heading level={6} text="Farm Locations" />
      <Map />
      <ButtonContainer {...buttonContainerData} />
    </div>
  );
};

export default MapSection;
