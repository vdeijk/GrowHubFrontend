import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addFieldStore from '../../../stores/derived/AddFieldStore/AddFieldStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddFieldPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { TextInputProps } from '../../reusables/TextInput/TextInput';

interface AddFieldPageProps {
  isEditing?: boolean;
}

const AddFieldPage: React.FC<AddFieldPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();

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

    const buttonProps: ButtonProps = {
      type: 'submit',
      label: isEditing ? 'Edit Field' : 'Add Field',
      customStyles: { marginTop: '1rem' },
    };

    const createTextInputFieldModel = (fieldKey: string): TextInputProps => ({
      ...addFieldStore.fields[fieldKey],
      value: String(addFieldStore.fields[fieldKey].value || ''),
      onChange: (value: string) =>
        addFieldStore.fields[fieldKey].setValue(value),
    });

    const locationNameFieldModel =
      createTextInputFieldModel('locationNameField');
    const latitudeFieldModel = createTextInputFieldModel('latitudeField');
    const longitudeFieldModel = createTextInputFieldModel('longitudeField');

    return (
      <section className={styles.section}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput {...locationNameFieldModel} />
          <TextInput {...latitudeFieldModel} />
          <div></div>
          <TextInput {...longitudeFieldModel} />
          <div></div>
          <Button {...buttonProps} />
        </form>
      </section>
    );
  },
);

export default AddFieldPage;
