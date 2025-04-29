import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addFieldStore from '../../../stores/AddFieldStore/AddFieldStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddFieldPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

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

    const locationNameFieldModel = {
      ...addFieldStore.fields.locationNameField,
      value: String(addFieldStore.fields.locationNameField.value),
      onChange: (value: string) =>
        addFieldStore.fields.locationNameField.setValue(value),
    };

    const latitudeFieldModel = {
      ...addFieldStore.fields.latitudeField,
      value: String(addFieldStore.fields.latitudeField.value),
      onChange: (value: string) =>
        addFieldStore.fields.latitudeField.setValue(value),
    };

    const longitudeFieldModel = {
      ...addFieldStore.fields.longitudeField,
      value: String(addFieldStore.fields.longitudeField.value),
      onChange: (value: string) =>
        addFieldStore.fields.longitudeField.setValue(value),
    };

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
