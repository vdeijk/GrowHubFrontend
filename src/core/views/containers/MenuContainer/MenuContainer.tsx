import React, { useEffect } from 'react';
import styles from './MenuContainer.module.css';
import MenuLink from '../../reusables/MenuLink/MenuLink';
import Heading from '../../reusables/Heading/Heading';
import HelpButton from '../../reusables/HelpButton/HelpButton';
import routerService from '../../../services/RouterService/RouterService';
import { useLocation, matchPath } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import menuService from '../../../services/MenuService/MenuService';

const MenuContainer: React.FC = observer(() => {
  const handleHelpOpen = () => {};
  const location = useLocation();
  const activeMenuLink = routerService.menuLinks.find((menuLink) =>
    matchPath(location.pathname, menuLink.path),
  );

  useEffect(() => {
    menuService.checkScreenWidth();
  }, [location.pathname]);

  return (
    <div
      className={`${styles.container} ${
        menuService.isMenuOpen ? styles.open : styles.closed
      }`}
    >
      <div className={styles.profile}>
        <div className={styles.heading}>
          <Heading
            level={4}
            customStyles={{ marginBottom: '2rem', color: '#FDFDFD' }}
          >
            {routerService.currentLabel}
          </Heading>
          <HelpButton
            summary={activeMenuLink?.tooltip}
            onClick={handleHelpOpen}
          />
        </div>
        <img
          src={routerService.currentImageUrl}
          alt="Profile"
          className={styles.image}
        />
      </div>
      <ul className={styles.unorderedList}>
        {routerService.getVisibleLinks().map((menuLink, index) => (
          <MenuLink key={index} menuLinkData={menuLink} />
        ))}
      </ul>
    </div>
  );
});

export default MenuContainer;
