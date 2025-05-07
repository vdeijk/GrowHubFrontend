import React from 'react';
import styles from './ButtonContainer.module.css';
import Button from '../Button/Button';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';

export interface ButtonContainerProps {
  buttons: ButtonProps[];
  customStyles?: React.CSSProperties;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  buttons,
  customStyles,
}) => {
  return (
    <div className={styles.buttonContainer} style={customStyles}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          label={button.label}
          type={button.type}
        />
      ))}
    </div>
  );
};

export default ButtonContainer;
