import React from 'react';
import styles from './MenuLink.module.css';
import { MenuLinkData } from '../../../../auxiliary/interfaces/MenuLinkData';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface MenuLinkProps {
  menuLinkData: MenuLinkData;
}

const MenuLink: React.FC<MenuLinkProps> = observer(({ menuLinkData }) => {
  const { path, label } = menuLinkData;
  const navigate = useRouterNavigation();
  const location = useLocation();

  const isActive = location.pathname === path;

  const clickHandler = () => {
    navigate(path);
  };

  return (
    <li className={styles.menuItem}>
      <button
        onClick={clickHandler}
        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
      >
        {label}
      </button>
    </li>
  );
});

export default MenuLink;
