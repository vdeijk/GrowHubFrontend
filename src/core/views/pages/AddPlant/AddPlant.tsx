import React from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import Heading from '../../reusables/Heading/Heading';
import { useNavigate } from 'react-router-dom';
import addPlantStore from '../../../stores/AddPlantStore/AddPlantStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddPlant.module.css';
import { observer } from 'mobx-react-lite';

const AddPlant: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlantStore.addPlant();
    addPlantStore.resetForm();
    navigate('/');
  };

  const nameProps: TextInputProps = {
    value: addPlantStore.commonName,
    onChange: (value: string) => addPlantStore.updateField('commonName', value),
    placeholder: 'Common Name',
    label: 'Common Name',
    required: true,
  };

  const sunPreferenceProps: TextInputProps = {
    value: addPlantStore.genus,
    onChange: (value: string) => addPlantStore.updateField('genus', value),
    placeholder: 'Genus',
    label: 'Genus',
    required: true,
  };

  const waterNeedsProps: TextInputProps = {
    value: addPlantStore.scientificName,
    onChange: (value: string) =>
      addPlantStore.updateField('scientificName', value),
    placeholder: 'Scientific Name',
    label: 'Scientific Name',
    required: true,
  };

  const buttonProps: ButtonProps = {
    type: 'submit',
    label: 'Add Crop',
  };

  return (
    <section className={styles.section}>
      <Heading level={1} text="Add New Crop" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput {...nameProps} />
        <TextInput {...sunPreferenceProps} />
        <TextInput {...waterNeedsProps} />
        <Button {...buttonProps} />
      </form>
    </section>
  );
});

export default AddPlant;
