import React from 'react';
import popupStore from '../../../stores/PopupStore/PopupStore';
import { observer } from 'mobx-react-lite';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import { ButtonProps } from '../Button/Button';
import styles from './TaskPopup.module.css';
import { ButtonConfig } from '../ButtonContainer/ButtonContainer';

interface TaskPopupProps {
  description: string | undefined;
}

const TaskPopup: React.FC<TaskPopupProps> = observer(({ description }) => {
  const { closePopup } = popupStore;

  const buttonConfigs: ButtonConfig[] = [
    {
      clickHandler: closePopup,
      label: 'Save',
    },
    {
      clickHandler: closePopup,
      label: 'Close',
    },
  ];

  return (
    <>
      <h2>Task Description</h2>
      <textarea readOnly value={description} className={styles.textArea} />
      <ButtonContainer buttons={buttonConfigs} />
    </>
  );
});

export default TaskPopup;
