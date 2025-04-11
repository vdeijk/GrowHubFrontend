import React from 'react';
import styles from './FarmLocations.module.css';
import Map from '../../reusables/Map/Map';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import LocationList from '../../containers/LocationList/LocationList';
import locationStore from '../../../stores/LocationStore/LocationStore';
import { observer } from 'mobx-react-lite';

const FarmLocations: React.FC = observer(() => {
  const buttonContainerData = {
    clickHandler: () => {},
    label: 'Add location',
  };

  const handleEdit = (id: number) => {
    console.log(`Edit location with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete location with id: ${id}`);
    locationStore.deleteLocation(id);
  };

  const listData = {
    locations: locationStore.locations,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  const markers = locationStore.locations.map((location) => ({
    lat: location.latitude,
    lng: location.longitude,
    popupContent: location.name,
  }));

  const mapData = {
    enableScroll: true,
    markers,
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Heading level={6} text="Farm Locations" />
      </div>
      <div className={styles.left}>
        <Map {...mapData} />
      </div>
      <div className={styles.right}>
        <LocationList {...listData} />
        <ButtonContainer {...buttonContainerData} />
      </div>
    </div>
  );
});

export default FarmLocations;
