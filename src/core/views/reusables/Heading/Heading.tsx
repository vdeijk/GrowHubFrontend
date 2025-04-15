import React, { JSX } from 'react';
import styles from './Heading.module.css';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  customStyles?: React.CSSProperties;
}

const Heading: React.FC<HeadingProps> = ({ level, text, customStyles }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={styles[`h${level}`]} style={customStyles}>
      {text}
    </Tag>
  );
};

export default Heading;
