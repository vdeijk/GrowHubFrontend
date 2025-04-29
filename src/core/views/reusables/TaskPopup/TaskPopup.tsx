import React from 'react';
import popupStore from '../../../stores/PopupStore/PopupStore';
import { observer } from 'mobx-react-lite';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import styles from './TaskPopup.module.css';
import TextInput from '../TextInput/TextInput';
import { ButtonConfig } from '../ButtonContainer/ButtonContainer';
import { Task } from '../../../../auxiliary/interfaces/Task';
import { InputField } from '../../../../auxiliary/classes/InputField';

interface TaskPopupProps {
  task: Task | undefined;
  updateTask: (task: Task) => void;
  descriptionField: InputField<string>;
}

const TaskPopup: React.FC<TaskPopupProps> = observer(
  ({ descriptionField, task, updateTask }) => {
    const { closePopup } = popupStore;

    const saveTask = () => {
      if (!task) return;

      updateTask(task);
    };

    const buttonConfigs: ButtonConfig[] = [
      {
        clickHandler: saveTask,
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
        <TextInput
          value={descriptionField.value}
          onChange={descriptionField.setValue}
          placeholder={descriptionField.placeholder}
          label={descriptionField.label}
          aria-label="Title"
        />
        <ButtonContainer buttons={buttonConfigs} />
      </>
    );
  },
);

export default TaskPopup;

/*<textarea
          readOnly
          value={task?.description}
          className={styles.textArea}
        />*/
