import React from 'react';
import styles from './LocationList.module.css';
import { FarmLocationData } from '../../../../auxiliary/interfaces/FarmLocation';
import FarmLocation from '../../reusables/FarmLocation/FarmLocation';

interface LocationListProps {
  locations: FarmLocationData[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.locationList}>
      {locations.map((location) => (
        <FarmLocation
          location={location}
          onDelete={onDelete}
          onEdit={onEdit}
          key={location.id}
        />
      ))}
    </div>
  );
};

export default LocationList;
