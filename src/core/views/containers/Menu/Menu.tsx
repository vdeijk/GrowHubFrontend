import React from 'react';
import styles from './Menu.module.css';
import MenuLink from '../../reusables/MenuLink/MenuLink';
import { MenuLinkData } from '../../../../auxiliary/interfaces/MenuLinkData';
import Heading from '../../reusables/Heading/Heading';

interface MenuProps {
  userName: string;
  profilePicture: string;
  menuLinks: MenuLinkData[];
  curPageTitle: string;
}

const Menu: React.FC<MenuProps> = ({
  userName,
  profilePicture,
  menuLinks,
  curPageTitle,
}) => {
  return (
    <div className={styles.menu}>
      <div className={styles.profile}>
        <Heading level={4} text={curPageTitle}></Heading>
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
