import React from 'react';
import styles from './MapSectionContainer.module.css';
import Map from '../../reusables/Map/Map';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import locationStore from '../../../stores/FieldsStore/FieldsStore';

const MapSection: React.FC = observer(() => {
  const navigate = useNavigate();

  const buttonContainerData = {
    clickHandler: () => navigate('/fieldsPage'),
    label: 'View All Fields',
  };

  const markers = locationStore.locations.map((location) => ({
    lat: location.latitude,
    lng: location.longitude,
    popupContent: location.name,
  }));

  const mapData = {
    enableScroll: false,
    markers,
  };

  return (
    <div className={styles.container}>
      <Heading level={6} text="Your Fields" />
      <Map {...mapData} />
      <ButtonContainer {...buttonContainerData} />
    </div>
  );
});

export default MapSection;
