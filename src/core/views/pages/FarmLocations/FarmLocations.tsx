import React from 'react';
import styles from './FarmLocations.module.css';
import Map from '../../reusables/Map/Map';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import LocationList from '../../containers/LocationList/LocationList';

const FarmLocations: React.FC = () => {
  const buttonContainerData = {
    clickHandler: () => {},
    label: 'Add location',
  };

  const mockLocations = [
    { id: 1, name: 'North Field' },
    { id: 2, name: 'South Orchard' },
    { id: 3, name: 'East Greenhouse' },
    { id: 4, name: 'West Pasture' },
    { id: 5, name: 'Central Barn' },
  ];

  const handleEdit = (id: number) => {
    console.log(`Edit location with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    <LocationList
      locations={mockLocations}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />;
  };

  const data = {
    locations: mockLocations,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Heading level={6} text="Farm Locations" />
      </div>
      <div className={styles.left}>
        <Map enableScroll={true}/>
      </div>
      <div className={styles.right}>
        <LocationList {...data} />
        <ButtonContainer {...buttonContainerData} />
      </div>
    </div>
  );
};

export default FarmLocations;
