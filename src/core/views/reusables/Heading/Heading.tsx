import React, { JSX } from 'react';
import styles from './Heading.module.css';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  customStyles?: React.CSSProperties;
  children?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ level, children, customStyles }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={styles[`h${level}`]} style={customStyles}>
      {children}
    </Tag>
  );
};

export default Heading;
