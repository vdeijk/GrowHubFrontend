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
import cropsDatabaseStore from '../../../stores/CropsDatabaseStore/CropsDatabaseStore';

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

    const sunPreferenceFieldModel = {
      ...addCropStore.fields.sunPreferenceField,
      value: String(addCropStore.fields.sunPreferenceField.value),
      options: cropsDatabaseStore.dropdownFilters['sunPreference'].options,
      onChange: (value: string) =>
        addCropStore.fields.sunPreferenceField.setValue(value),
    };

    const waterNeedsFieldModel = {
      ...addCropStore.fields.waterNeedsField,
      value: String(addCropStore.fields.waterNeedsField.value),
      options: cropsDatabaseStore.dropdownFilters['waterNeeds'].options,
      onChange: (value: string) =>
        addCropStore.fields.waterNeedsField.setValue(value),
    };

    const soilTypeFieldModel = {
      ...addCropStore.fields.soilTypeField,
      value: String(addCropStore.fields.soilTypeField.value),
      options: cropsDatabaseStore.dropdownFilters['soilType'].options,
      onChange: (value: string) =>
        addCropStore.fields.soilTypeField.setValue(value),
    };

    const soilPHFieldModel = {
      ...addCropStore.fields.soilPHField,
      value: String(addCropStore.fields.soilPHField.value),
      options: cropsDatabaseStore.dropdownFilters['soilType'].options,
      onChange: (value: string) =>
        addCropStore.fields.soilPHField.setValue(value),
    };

    const pruningFieldModel = {
      ...addCropStore.fields.pruningField,
      value: String(addCropStore.fields.pruningField.value),
      options: cropsDatabaseStore.dropdownFilters['pruning'].options,
      onChange: (value: string) =>
        addCropStore.fields.pruningField.setValue(value),
    };

    const temperatureRangeFieldModel = {
      ...addCropStore.fields.temperatureRangeField,
      value: String(addCropStore.fields.temperatureRangeField.value),
      options: cropsDatabaseStore.dropdownFilters['temperatureRange'].options,
      onChange: (value: string) =>
        addCropStore.fields.temperatureRangeField.setValue(value),
    };

    const plantTypeFieldModel = {
      ...addCropStore.fields.plantTypeField,
      value: String(addCropStore.fields.plantTypeField.value),
      options: cropsDatabaseStore.dropdownFilters['plantType'].options,
      onChange: (value: string) =>
        addCropStore.fields.plantTypeField.setValue(value),
    };

    const growthRateFieldModel = {
      ...addCropStore.fields.growthRateField,
      value: String(addCropStore.fields.growthRateField.value),
      options: cropsDatabaseStore.dropdownFilters['growthRate'].options,
      onChange: (value: string) =>
        addCropStore.fields.growthRateField.setValue(value),
    };

    const fertilizerNeedsFieldModel = {
      ...addCropStore.fields.fertilizerNeedsField,
      value: String(addCropStore.fields.fertilizerNeedsField.value),
      options: cropsDatabaseStore.dropdownFilters['fertilizerNeeds'].options,
      onChange: (value: string) =>
        addCropStore.fields.fertilizerNeedsField.setValue(value),
    };

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addCropStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...nameFieldModel} />
            <Dropdown {...sunPreferenceFieldModel} />
            <Dropdown {...waterNeedsFieldModel} />
            <Dropdown {...soilTypeFieldModel} />
            <Dropdown {...soilPHFieldModel} />
            <Dropdown {...pruningFieldModel} />
            <Dropdown {...temperatureRangeFieldModel} />
            <Dropdown {...plantTypeFieldModel} />
            <Dropdown {...growthRateFieldModel} />
            <Dropdown {...fertilizerNeedsFieldModel} />
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddCropPage;
