import React from 'react';
import styles from './LanguageButton.module.css';

interface LanguageButtonProps {
  languageCode: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  languageCode,
  label,
  isActive,
  onClick,
  icon,
}) => {
  return (
    <button onClick={onClick} disabled={isActive} className={styles.button}>
      {icon} {label}
    </button>
  );
};

export default LanguageButton;
