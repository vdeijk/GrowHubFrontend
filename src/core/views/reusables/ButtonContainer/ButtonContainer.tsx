import React from 'react';
import styles from './ButtonContainer.module.css';
import Button from '../Button/Button';

interface ButtonContainerProps {
  buttonContainerData: {
    clickHandler: () => void;
    label: string;
  };
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  buttonContainerData,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <Button {...buttonContainerData} />
    </div>
  );
};

export default ButtonContainer;
