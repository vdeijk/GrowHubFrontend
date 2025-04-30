import React from 'react';
import popupStore from '../../../services/PopupService/PopupService';
import { observer } from 'mobx-react-lite';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import styles from './TaskPopup.module.css';
import TextInput from '../TextInput/TextInput';
import { ButtonConfig } from '../ButtonContainer/ButtonContainer';
import { InputField } from '../../../../auxiliary/classes/InputField';
import Heading from '../Heading/Heading';

interface TaskPopupProps {
  descriptionField: InputField<string>;
}

const TaskPopup: React.FC<TaskPopupProps> = observer(({ descriptionField }) => {
  const { closePopup } = popupStore;

  const buttonConfigs: ButtonConfig[] = [
    {
      clickHandler: closePopup,
      label: 'Close',
    },
  ];

  return (
    <>
      <Heading
        level={2}
        text="Task Details"
        customStyles={{ marginBottom: '2rem' }}
      />
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
});

export default TaskPopup;

/*<textarea
          readOnly
          value={task?.description}
          className={styles.textArea}
        />*/
