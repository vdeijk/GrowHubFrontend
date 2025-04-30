import React from 'react';
import styles from './FarmLocation.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LocationItem } from '../../../../api';

interface LocationProps {
  location: LocationItem;
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
          onClick={() => location.id && onEdit(location.id)}
          title="Edit"
        />
        <FaTrash
          className={styles.deleteIcon}
          onClick={() => location.id && onDelete(location.id)}
          title="Delete"
        />
      </div>
    </div>
  );
};

export default FarmLocation;
