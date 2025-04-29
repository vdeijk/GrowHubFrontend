import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddYourCropPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import addYourCropStore from '../../../stores/AddYourCropStore/AddYourCropStore';
import DateInput from '../../reusables/DateInput/DateInput';
import { DateInputProps } from '../../reusables/DateInput/DateInput';
import yourCropsStore from '../../../stores/YourCropsStore/YourCropsStore';

interface AddYourCropPageProps {
  isEditing?: boolean;
}

const AddYourCropPage: React.FC<AddYourCropPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
      if (isEditing && id) {
        addYourCropStore.loadCrop(id);
      } else {
        addYourCropStore.resetForm();
      }
    }, [isEditing, id]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!addYourCropStore.validateForm()) return;

      if (isEditing && id) {
        addYourCropStore.updateCrop(id);
      } else {
        addYourCropStore.addCrop();
      }

      addYourCropStore.resetForm();

      navigate('/cropsPage');
    };

    const buttonProps: ButtonProps = {
      type: 'submit',
      onClick: () => navigate('/tasksPage'),
      label: isEditing ? 'Edit Crop' : 'Add Crop',
      customStyles: { marginTop: '1rem' },
    };

    const nameFieldModel = {
      ...addYourCropStore.fields.nameField,
      value: String(addYourCropStore.fields.nameField.value),
      onChange: (value: string) =>
        addYourCropStore.fields.nameField.setValue(value),
    };

    const locationFieldModel = {
      ...addYourCropStore.fields.locationField,
      value: String(addYourCropStore.fields.locationField.value),
      options: yourCropsStore.dropdownFilters['location'].options,
      onChange: (value: string) =>
        addYourCropStore.fields.locationField.setValue(value),
    };

    const growthStageField = {
      ...addYourCropStore.fields.growthStageField,
      value: String(addYourCropStore.fields.growthStageField.value),
      options: yourCropsStore.dropdownFilters['waterNeeds'].options,
      onChange: (value: string) =>
        addYourCropStore.fields.growthStageField.setValue(value),
    };

    const healthStatusFieldModel = {
      ...addYourCropStore.fields.healthStatusField,
      value: String(addYourCropStore.fields.healthStatusField.value),
      options: yourCropsStore.dropdownFilters['healthStatus'].options,
      onChange: (value: string) =>
        addYourCropStore.fields.soilTypeField.setValue(value),
    };

    const lastWateredFieldModel: DateInputProps = {
      ...addYourCropStore.fields.lastWateredField,
      value: String(addYourCropStore.fields.lastWateredField.value || ''),
      onChange: (value) =>
        addYourCropStore.fields.lastWateredField.setValue(value || ''),
    };

    const lastFertilizedFieldModel: DateInputProps = {
      ...addYourCropStore.fields.lastFertilizedField,
      value: String(addYourCropStore.fields.lastFertilizedField.value || ''),
      onChange: (value) =>
        addYourCropStore.fields.lastFertilizedField.setValue(value || ''),
    };

    const lastPrunedFieldModel: DateInputProps = {
      ...addYourCropStore.fields.lastPrunedField,
      value: String(addYourCropStore.fields.lastPrunedField.value || ''),
      onChange: (value) =>
        addYourCropStore.fields.lastPrunedField.setValue(value || ''),
    };

    const lastHarvestedFieldModel: DateInputProps = {
      ...addYourCropStore.fields.lastHarvestedField,
      value: String(addYourCropStore.fields.lastHarvestedField.value || ''),
      onChange: (value) =>
        addYourCropStore.fields.lastHarvestedField.setValue(value || ''),
    };

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addYourCropStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...nameFieldModel} />
            <Dropdown {...locationFieldModel} />
            <Dropdown {...growthStageField} />
            <Dropdown {...healthStatusFieldModel} />
            <DateInput {...lastWateredFieldModel} />
            <DateInput {...lastFertilizedFieldModel} />
            <DateInput {...lastPrunedFieldModel} />
            <DateInput {...lastHarvestedFieldModel} />
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddYourCropPage;
