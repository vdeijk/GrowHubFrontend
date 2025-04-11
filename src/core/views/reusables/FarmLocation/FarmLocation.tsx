import React from 'react';
import styles from './FarmLocation.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FarmLocationData } from '../../../../auxiliary/interfaces/FarmLocation';

interface LocationProps {
  location: FarmLocationData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const FarmLocation: React.FC<LocationProps> = ({
  location,
  onEdit,
  onDelete,
}) => {
  return (
    <div key={location.id} className={styles.locationItem}>
      <span className={styles.locationName}>{location.name}</span>
      <div className={styles.actionIcons}>
        <FaEdit
          className={styles.editIcon}
          onClick={() => onEdit(location.id)}
          title="Edit"
        />
        <FaTrash
          className={styles.deleteIcon}
          onClick={() => onDelete(location.id)}
          title="Delete"
        />
      </div>
    </div>
  );
};

export default FarmLocation;
