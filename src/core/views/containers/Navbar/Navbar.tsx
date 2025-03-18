import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faQuestionCircle,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

interface NavbarProps {
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <a href="/">Brand</a>
      </div>
      <div className={styles.navbarActions}>
        <div className={styles.userNameContainer}>
          <span className={styles.userName}>{userName}</span>
          <button className={styles.userIcon}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
        <button className={styles.helpButton}>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </button>
        <button className={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
