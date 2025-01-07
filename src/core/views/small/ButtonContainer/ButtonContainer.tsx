import React from "react";
import styles from "./ButtonContainer.module.css";
import Button from "../../small/Button/Button";

interface ButtonContainerProps {
  buttonContainerProps: {
    clickHandler: () => void;
    label: string;
  };
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  buttonContainerProps,
}) => {
  const { clickHandler, label } = buttonContainerProps;

  return (
    <div className={styles.buttonContainer}>
      <Button onClick={clickHandler}>{label}</Button>
    </div>
  );
};

export default ButtonContainer;
