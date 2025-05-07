import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './NavbarContainer.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import LanguageSwitcher from '../../reusables/LanguageSwitcher/LanguageSwitcher';
import HamburgerIcon from '../../reusables/HamburgerIcon/HamburgerIcon';
import menuService from '../../../services/MenuService/MenuService';

interface NavbarProps {
  userName: string;
}

const NavbarContainer: React.FC<NavbarProps> = ({ userName }) => {
  const { logout } = useAuth0();

  return (
    <nav className={styles.container}>
      <div className={styles.leftContainer}>
        <HamburgerIcon onClick={menuService.toggleMenu} />
        <a href="/" className={styles.logo}>
          GrowHub
        </a>
      </div>
      <div className={styles.navbarActions}>
        <LanguageSwitcher />
        <div className={styles.userNameContainer}>
          <span className={styles.userName}>{userName}</span>
        </div>
        <button
          className={styles.logoutButton}
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: import.meta.env.VITE_AUTH0_REDIRECT_URI,
              },
            })
          }
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
    </nav>
  );
};

export default NavbarContainer;
