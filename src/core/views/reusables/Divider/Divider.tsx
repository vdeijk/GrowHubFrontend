import React from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  color?: 'primary' | 'grey' | 'light' | 'dark';
}

const Divider: React.FC<DividerProps> = ({ color = 'grey' }) => {
  const colorClass = color ? styles[color] : '';

  return <hr className={`${styles.divider} ${colorClass}`} />;
};

export default Divider;
