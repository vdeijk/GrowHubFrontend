import React, { useEffect } from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import Heading from '../../reusables/Heading/Heading';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
      if (isEditing && id) {
        addFieldStore.loadField(id);
      } else {
        addFieldStore.resetForm();
      }
    }, [isEditing, id]);

    const title = isEditing ? 'Edit Field' : 'Add New Field';

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addFieldStore.addField();
      addFieldStore.resetForm();
      navigate('/');
    };

    const nameProps: TextInputProps = {
      value: addFieldStore.locationName,
      onChange: (value: string) =>
        addFieldStore.updateFormField('locationName', value),
      placeholder: 'Location Name',
      label: 'Location Name',
      required: true,
    };

    const longitudeProps: TextInputProps = {
      value: addFieldStore.longitude.toString(),
      onChange: (value: string) =>
        addFieldStore.updateFormField('longitude', value),
      placeholder: 'Longitude',
      label: 'Longitude',
      required: true,
    };

    const latitudeProps: TextInputProps = {
      value: addFieldStore.latitude.toString(),
      onChange: (value: string) =>
        addFieldStore.updateFormField('latitude', value),
      placeholder: 'Latitude',
      label: 'Latitude',
      required: true,
    };

    const buttonProps: ButtonProps = {
      type: 'submit',
      label: 'Add Field',
    };

    return (
      <section className={styles.section}>
        <Heading level={1} text={title} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput {...nameProps} />
          <TextInput {...longitudeProps} />
          <TextInput {...latitudeProps} />
          <Button {...buttonProps} />
        </form>
      </section>
    );
  },
);

export default AddFieldPage;
