import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  buttonData: {
    onClick: () => void;
    label: string;
    className?: string;
  };
}

const Button: React.FC<ButtonProps> = ({ buttonData }) => {
  const { onClick, label, className } = buttonData;

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
