import React from 'react';
import styles from './SyncButton.module.css';
import { FaSync } from 'react-icons/fa';

interface SyncButtonProps {
  onClick: () => void;
  isSyncing?: boolean;
  label?: string;
}

const SyncButton: React.FC<SyncButtonProps> = ({
  onClick,
  isSyncing = false,
  label = '',
}) => {
  return (
    <button
      className={styles.syncButton}
      onClick={onClick}
      disabled={isSyncing}
    >
      <span className={styles.label}>{label}</span>
      {isSyncing ? (
        <span className={styles.spinner} />
      ) : (
        <FaSync className={styles.syncIcon} />
      )}
    </button>
  );
};

export default SyncButton;
