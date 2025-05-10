import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './FilterTag.module.css';

interface FilterTagProps {
  label: string;
  onRemove: () => void;
  type?: 'text' | 'dropdown' | 'date';
}

const FilterTag: React.FC<FilterTagProps> = ({
  label,
  onRemove,
  type = 'text',
}) => {
  const handleRemove = () => {
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  return (
    <div className={`${styles.tag} ${styles[type]}`}>
      <span className={styles.label}>{label}</span>
      <button
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label={`Remove filter: ${label}`}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default FilterTag;
