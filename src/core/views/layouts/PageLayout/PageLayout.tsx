import React from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default PageLayout;
