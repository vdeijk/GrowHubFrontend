import React from 'react';
import styles from './MenuLink.module.css';
import { MenuLinkData } from '../../../../auxiliary/interfaces/MenuLinkData';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';

interface MenuLinkProps {
  menuLinkData: MenuLinkData;
}

const MenuLink: React.FC<MenuLinkProps> = ({ menuLinkData }) => {
  const { href, label } = menuLinkData;
  const navigate = useRouterNavigation();

  const clickHandler = () => {
    navigate(href);
  };

  return (
    <li className={styles.menuItem}>
      <a onClick={clickHandler} className={styles.menuLink}>
        {label}
      </a>
    </li>
  );
};

export default MenuLink;
