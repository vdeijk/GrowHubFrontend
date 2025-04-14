import React from 'react';
import styles from './FieldListContainer.module.css';
import { LocationItem } from '../../../../auxiliary/interfaces/LocationItem';
import FarmLocation from '../../reusables/FarmLocation/FarmLocation';

interface LocationListProps {
  locations: LocationItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const FieldListContainer: React.FC<LocationListProps> = ({
  locations,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.container}>
      {locations.map((location) => {
        return (
          <FarmLocation
            location={location}
            onDelete={onDelete}
            onEdit={onEdit}
            key={location.id}
          />
        );
      })}
    </div>
  );
};

export default FieldListContainer;
