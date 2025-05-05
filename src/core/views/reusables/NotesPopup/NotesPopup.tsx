import React from 'react';
import popupStore from '../../../services/PopupService/PopupService';
import { observer } from 'mobx-react-lite';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import TextArea from '../TextArea/TextArea';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import { InputField } from '../../../../auxiliary/classes/InputField';
import Heading from '../Heading/Heading';

interface NotesPopupProps {
  title: string;
  description: InputField<string>;
}

const NotesPopup: React.FC<NotesPopupProps> = observer(
  ({ description, title }) => {
    const { closePopup } = popupStore;

    const buttonConfigs: ButtonProps[] = [
      {
        onClick: closePopup,
        label: 'Close',
      },
    ];

    return (
      <>
        <Heading
          level={2}
          text={title}
          customStyles={{ marginBottom: '2rem' }}
        />
        <TextArea
          value={description.value}
          onChange={description.setValue}
          placeholder={description.placeholder}
          label={description.label}
          aria-label="Title"
        />
        <ButtonContainer buttons={buttonConfigs} />
      </>
    );
  },
);

export default NotesPopup;
