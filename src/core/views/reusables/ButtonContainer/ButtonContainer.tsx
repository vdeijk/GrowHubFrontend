import React from 'react';
import styles from './ButtonContainer.module.css';
import Button from '../Button/Button';

export interface ButtonConfig {
  label: string;
  clickHandler: () => void;
}

export interface ButtonContainerProps {
  buttons: ButtonConfig[];
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ buttons }) => {
  return (
    <div className={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={button.clickHandler}
          label={button.label}
        />
      ))}
    </div>
  );
};

export default ButtonContainer;
