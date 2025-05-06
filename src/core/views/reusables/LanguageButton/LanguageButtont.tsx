import React from 'react';
import styles from './LanguageButton.module.css';

interface LanguageButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  label,
  isActive,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`${styles.button} ${isActive ? styles.active : ''}`}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default LanguageButton;
