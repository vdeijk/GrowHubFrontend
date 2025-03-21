import React from 'react';
import styles from './ButtonContainer.module.css';
import Button from '../Button/Button';

interface ButtonContainerProps {
  clickHandler: () => void;
  label: string;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  clickHandler,
  label,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <Button onClick={clickHandler} label={label} />
    </div>
  );
};

export default ButtonContainer;
