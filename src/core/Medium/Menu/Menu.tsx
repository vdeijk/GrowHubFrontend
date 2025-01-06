import React from "react";
import styles from "./Menu.module.css";

interface MenuProps {
  userName: string;
  profilePicture: string;
}

const Menu: React.FC<MenuProps> = ({ userName, profilePicture }) => {
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
        <li className={styles.menuItem}>
          <a href="/home" className={styles.menuLink}>
            Home
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/about" className={styles.menuLink}>
            About
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/services" className={styles.menuLink}>
            Services
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/contact" className={styles.menuLink}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
