import React from 'react';
import styles from './PageLayout.module.css';
import menuService from '../../../services/MenuService/MenuService';
import { observer } from 'mobx-react-lite';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = observer(({ children }) => {
  return (
    <div
      className={`${styles.layout} ${
        menuService.isMenuOpen ? '' : styles.menuClosed
      }`}
    >
      {children}
    </div>
  );
});

export default PageLayout;
