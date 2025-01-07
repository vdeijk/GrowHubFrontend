import React from "react";
import styles from "./ButtonContainer.module.css";
import Button from "../../small/Button/Button";

interface ButtonContainerProps {
  clickHandler: () => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ clickHandler }) => {
  return (
    <div className={styles.buttonContainer}>
      <Button onClick={clickHandler}>Go To TaskManager</Button>
    </div>
  );
};

export default ButtonContainer;