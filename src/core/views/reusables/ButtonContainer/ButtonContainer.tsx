import React from 'react';
import styles from './ButtonContainer.module.css';
import Button from '../Button/Button';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';

export interface ButtonContainerProps {
  buttons: ButtonProps[];
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ buttons }) => {
  return (
    <div className={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          label={button.label}
        />
      ))}
    </div>
  );
};

export default ButtonContainer;
