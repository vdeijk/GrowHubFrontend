import React from "react";
import styles from "./NavbarLink.module.css";

const NavbarLink: React.FC = () => {
  return (
    <li className={styles.navItem}>
      <a href="/test" className={styles.navLink}>
        Contact
      </a>
    </li>
  );
};

export default NavbarLink;
