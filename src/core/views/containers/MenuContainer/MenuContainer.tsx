import React from 'react';
import styles from './MenuContainer.module.css';
import MenuLink from '../../reusables/MenuLink/MenuLink';
import Heading from '../../reusables/Heading/Heading';
import HelpButton from '../../reusables/HelpButton/HelpButton';
import routerService from '../../../services/RouterService/RouterService';
import profilePicture from '../../../../auxiliary/assets/cropGrowHub.jpg';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { useLocation } from 'react-router-dom';

const MenuContainer: React.FC = () => {
  const handleHelpOpen = () => {};

  const navigate = useRouterNavigation();
  const location = useLocation();

  const activeMenuLink = routerService.menuLinks.find(
    (menuLink) => menuLink.path === location.pathname,
  );

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.heading}>
          <Heading
            level={4}
            text={routerService.currentLabel}
            customStyles={{ marginBottom: '2rem', color: '#FDFDFD' }}
          />
          <HelpButton
            summary={activeMenuLink?.tooltip}
            onClick={handleHelpOpen}
          />
        </div>
        <img src={profilePicture} alt="Profile" className={styles.image} />
      </div>
      <ul className={styles.unorderedList}>
        {routerService.getVisibleLinks().map((menuLink, index) => (
          <MenuLink key={index} menuLinkData={menuLink} />
        ))}
      </ul>
    </div>
  );
};

export default MenuContainer;
