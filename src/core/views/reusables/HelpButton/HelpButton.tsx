import React from 'react';
import styles from './HelpButton.module.css';

interface HelpButtonProps {
  summary?: string;
  onClick: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ summary = '', onClick }) => {
  return (
    <button
      className={styles.button}
      title={summary}
      onClick={onClick}
      aria-label="Help"
    >
      ?
    </button>
  );
};

export default HelpButton;
