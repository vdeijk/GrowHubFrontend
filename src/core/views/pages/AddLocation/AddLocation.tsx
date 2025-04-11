import React from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import Heading from '../../reusables/Heading/Heading';
import { useNavigate } from 'react-router-dom';
import addLocationStore from '../../../stores/AddLocationStore/AddLocationStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddLocation.module.css';
import { observer } from 'mobx-react-lite';

const AddLocation: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLocationStore.addLocation();
    addLocationStore.resetForm();
    navigate('/');
  };

  const nameProps: TextInputProps = {
    value: addLocationStore.locationName,
    onChange: (value: string) => addLocationStore.updateField('locationName', value),
    placeholder: 'Location Name',
    label: 'Location Name',
    required: true,
  };

  const sunPreferenceProps: TextInputProps = {
    value: addLocationStore.longitude.toString(),
    onChange: (value: string) => addLocationStore.updateField('longitude', value),
    placeholder: 'Longitude',
    label: 'Longitude',
    required: true,
  };

  const waterNeedsProps: TextInputProps = {
    value: addLocationStore.latitude.toString(),
    onChange: (value: string) =>
      addLocationStore.updateField('latitude', value),
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
      <Heading level={1} text="Add New Field" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput {...nameProps} />
        <TextInput {...sunPreferenceProps} />
        <TextInput {...waterNeedsProps} />
        <Button {...buttonProps} />
      </form>
    </section>
  );
});

export default AddLocation;
