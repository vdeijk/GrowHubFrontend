import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, label, className, type = 'button' } = props;

  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={type === 'submit' ? undefined: onClick}
    >
      {label}
    </button>
  );
};

export default Button;
