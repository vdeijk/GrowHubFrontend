import React from 'react';
import styles from './MenuContainer.module.css';
import MenuLink from '../../reusables/MenuLink/MenuLink';
import { MenuLinkData } from '../../../../auxiliary/interfaces/MenuLinkData';
import Heading from '../../reusables/Heading/Heading';

interface MenuProps {
  userName: string;
  profilePicture: string;
  menuLinks: MenuLinkData[];
  curPageTitle: string;
}

const MenuContainer: React.FC<MenuProps> = ({
  userName,
  profilePicture,
  menuLinks,
  curPageTitle,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <Heading
          level={4}
          text={curPageTitle}
          customStyles={{ marginBottom: '2rem', color: '#FDFDFD' }}
        />
        <img src={profilePicture} alt="Profile" className={styles.image} />
        {/* <span className={styles.userName}>{userName}</span> */}
      </div>
      <ul className={styles.unorderedList}>
        {menuLinks.map((menuLink, index) => (
          <MenuLink key={index} menuLinkData={menuLink} />
        ))}
      </ul>
    </div>
  );
};

export default MenuContainer;
