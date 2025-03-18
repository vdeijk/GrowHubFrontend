import React from 'react';
import styles from './MenuLink.module.css';
import { MenuLinkData } from '../../../../auxiliary/interfaces/MenuLinkData';

interface MenuLinkProps {
  menuLinkData: MenuLinkData;
}

const MenuLink: React.FC<MenuLinkProps> = ({ menuLinkData }) => {
  const { href, label } = menuLinkData;

  return (
    <li className={styles.menuItem}>
      <a href={href} className={styles.menuLink}>
        {label}
      </a>
    </li>
  );
};

export default MenuLink;
