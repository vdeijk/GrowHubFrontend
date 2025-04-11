import React from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import Heading from '../../reusables/Heading/Heading';
import { useNavigate } from 'react-router-dom';
import addCropStore from '../../../stores/AddCropStore/AddCropStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddCropPage.module.css';
import { observer } from 'mobx-react-lite';

const AddCropPage: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCropStore.addPlant();
    addCropStore.resetForm();
    navigate('/');
  };

  const nameProps: TextInputProps = {
    value: addCropStore.commonName,
    onChange: (value: string) => addCropStore.updateField('commonName', value),
    placeholder: 'Common Name',
    label: 'Common Name',
    required: true,
  };

  const sunPreferenceProps: TextInputProps = {
    value: addCropStore.genus,
    onChange: (value: string) => addCropStore.updateField('genus', value),
    placeholder: 'Genus',
    label: 'Genus',
    required: true,
  };

  const waterNeedsProps: TextInputProps = {
    value: addCropStore.scientificName,
    onChange: (value: string) =>
      addCropStore.updateField('scientificName', value),
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

export default AddCropPage;
