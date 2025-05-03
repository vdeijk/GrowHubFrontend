import React from 'react';
import styles from './FooterContainer.module.css';

const FooterContainer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} VanEyk Web Development. All
        rights reserved.
      </p>
    </footer>
  );
};

export default FooterContainer;
