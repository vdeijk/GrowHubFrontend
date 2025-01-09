import React from 'react';
import styles from './Menu.module.css';
import MenuLink from '../../small/MenuLink/MenuLink';
import { MenuLinkData } from '../../../../auxiliary/interfaces/MenuLinkData';

interface MenuProps {
  userName: string;
  profilePicture: string;
}

const Menu: React.FC<MenuProps> = ({ userName, profilePicture }) => {
  const menuLinks: MenuLinkData[] = [
    { href: '/about', label: 'Calendar' },
    { href: '/services', label: 'Task Manager' },
    { href: '/services', label: 'Weather Report' },
    { href: '/services', label: 'Statistics' },
    { href: '/services', label: 'Finance' },
    { href: '/contact', label: 'Plant Database' },
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.profile}>
        <h4 className={styles.h4}>Dashboard</h4>
        <img
          src={profilePicture}
          alt="Profile"
          className={styles.profilePicture}
        />
        <span className={styles.userName}>{userName}</span>
      </div>
      <ul className={styles.menuList}>
        {menuLinks.map((menuLink, index) => (
          <MenuLink key={index} menuLinkData={menuLink} />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
