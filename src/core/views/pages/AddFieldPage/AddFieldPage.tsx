import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addFieldStore from '../../../stores/derived/AddFieldStore/AddFieldStore';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import styles from './AddFieldPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { TextInputProps } from '../../reusables/TextInput/TextInput';
import TextArea from '../../reusables/TextArea/TextArea';
import { useTranslation } from 'react-i18next';

interface AddFieldPageProps {
  isEditing?: boolean;
}

const AddFieldPage: React.FC<AddFieldPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    useEffect(() => {
      if (isEditing && id) {
        addFieldStore.loadField(id);
      } else {
        addFieldStore.resetForm();
      }
    }, [isEditing, id]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!addFieldStore.validateForm()) return;

      if (isEditing && id) {
        addFieldStore.updateField(id);
      } else {
        addFieldStore.addField();
      }

      addFieldStore.resetForm();

      navigate('/fieldsPage');
    };

    const buttonContainerData: ButtonProps[] = [
      {
        type: 'button',
        onClick: () => navigate('/fieldsPage'),
        label: t('addFieldPage.buttons.back'),
      },
      {
        type: 'submit',
        label: isEditing
          ? t('addFieldPage.buttons.editField')
          : t('addFieldPage.buttons.addField'),
        customStyles: { marginTop: '1rem' },
      },
    ];

    const createTextInputFieldModel = (fieldKey: string): TextInputProps => ({
      ...addFieldStore.inputFields[fieldKey],
      value: String(addFieldStore.inputFields[fieldKey].value || ''),
      onChange: (value: string) =>
        addFieldStore.inputFields[fieldKey].setValue(value),
    });

    const locationNameFieldModel = createTextInputFieldModel('name');
    const notesFieldModel = createTextInputFieldModel('notes');
    const latitudeFieldModel = createTextInputFieldModel('latitude');
    const longitudeFieldModel = createTextInputFieldModel('longitude');

    return (
      <section className={styles.section}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput {...locationNameFieldModel} />
          <TextArea {...notesFieldModel} />
          <TextInput {...latitudeFieldModel} />
          <TextInput {...longitudeFieldModel} />
          <ButtonContainer
            customStyles={{ gridColumn: '1 / -1' }}
            buttons={buttonContainerData}
          />
        </form>
      </section>
    );
  },
);

export default AddFieldPage;
