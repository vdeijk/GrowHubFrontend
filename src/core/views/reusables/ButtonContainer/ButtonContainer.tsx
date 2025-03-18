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
  const { clickHandler, label } = buttonContainerData;

  const buttonData = {
    onClick: clickHandler,
    label,
  };

  return (
    <div className={styles.buttonContainer}>
      <Button buttonData={buttonData} />
    </div>
  );
};

export default ButtonContainer;
