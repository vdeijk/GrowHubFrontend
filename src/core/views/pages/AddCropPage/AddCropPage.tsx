import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addCropStore from '../../../stores/AddCropStore/AddCropStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddCropPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import cropsStore from '../../../stores/YourCropsStore/YourCropsStore';

interface AddCropPageProps {
  isEditing?: boolean;
}

const AddCropPage: React.FC<AddCropPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
      if (isEditing && id) {
        addCropStore.loadCrop(id);
      } else {
        addCropStore.resetForm();
      }
    }, [isEditing, id]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!addCropStore.validateForm()) return;

      if (isEditing && id) {
        addCropStore.updateCrop(id);
      } else {
        addCropStore.addCrop();
      }

      addCropStore.resetForm();

      navigate('/cropsDatabase');
    };

    const buttonProps: ButtonProps = {
      type: 'submit',
      onClick: () => navigate('/tasksPage'),
      label: isEditing ? 'Edit Crop' : 'Add Crop',
      customStyles: { marginTop: '1rem' },
    };

    const nameFieldModel = {
      ...addCropStore.fields.nameField,
      value: String(addCropStore.fields.nameField.value),
      onChange: (value: string) =>
        addCropStore.fields.nameField.setValue(value),
    };

    const genusFieldModel = {
      ...addCropStore.fields.genusField,
      value: String(addCropStore.fields.genusField.value),
      options: cropsStore.dropdownFilters['genus'].options,
      onChange: (value: string) =>
        addCropStore.fields.genusField.setValue(value),
    };

    const scientificNameFieldModel = {
      ...addCropStore.fields.scientificNameField,
      value: String(addCropStore.fields.scientificNameField.value),
      onChange: (value: string) =>
        addCropStore.fields.scientificNameField.setValue(value),
    };

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addCropStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...nameFieldModel} />
            <Dropdown {...genusFieldModel} />
            <TextInput {...scientificNameFieldModel} />
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddCropPage;
