import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './HamburgerIcon.module.css';

interface HamburgerIconProps {
  onClick: () => void;
  ariaLabel?: string;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  onClick,
  ariaLabel = 'Open menu',
}) => {
  return (
    <button
      className={styles.hamburgerButton}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <FaBars className={styles.icon} />
    </button>
  );
};

export default HamburgerIcon;
