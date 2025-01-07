import React from "react";
import styles from "./Menu.module.css";
import MenuLink from "../../small/MenuLink/MenuLink";

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
      <MenuLink href="/home">Home</MenuLink>
        <MenuLink href="/about">Calendar</MenuLink>
        <MenuLink href="/services">Task Manager</MenuLink>
        <MenuLink href="/services">Weather Report</MenuLink>
        <MenuLink href="/services">Statistics</MenuLink>
        <MenuLink href="/services">Finance</MenuLink>
        <MenuLink href="/contact">Plant Database</MenuLink>
      </ul>
    </div>
  );
};

export default Menu;
