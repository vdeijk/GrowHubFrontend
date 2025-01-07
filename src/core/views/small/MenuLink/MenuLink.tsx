import React from 'react';
import styles from './MenuLink.module.css';

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, children }) => {
  return (
    <li className={styles.menuItem}>
      <a href={href} className={styles.menuLink}>
        {children}
      </a>
    </li>
  );
};

export default MenuLink;