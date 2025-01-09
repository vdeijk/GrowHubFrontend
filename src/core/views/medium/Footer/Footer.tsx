import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Van der Eijk Web Development. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
