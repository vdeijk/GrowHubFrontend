import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, label, className, type = 'button', customStyles } = props;

  return (
    <button
      aria-label={label}
      type={type}
      className={`${styles.button} ${className}`}
      onClick={type === 'submit' ? undefined : onClick}
      style={customStyles}
    >
      {label}
    </button>
  );
};

export default Button;
