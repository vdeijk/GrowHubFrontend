import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faQuestionCircle,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './NavbarContainer.module.css';
import { useAuth0 } from '@auth0/auth0-react';

interface NavbarProps {
  userName: string;
}

const NavbarContainer: React.FC<NavbarProps> = ({ userName }) => {
  const { logout } = useAuth0();

  return (
    <nav className={styles.container}>
      <div>
        <a href="/" className={styles.logo}>
          GrowHub
        </a>
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
        <button
          className={styles.logoutButton}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
    </nav>
  );
};

export default NavbarContainer;
