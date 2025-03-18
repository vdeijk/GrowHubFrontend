import React from 'react';
import styles from './Heading.module.css';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ level, text }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={styles[`h${level}`]}>{text}</Tag>;
};

export default Heading;
