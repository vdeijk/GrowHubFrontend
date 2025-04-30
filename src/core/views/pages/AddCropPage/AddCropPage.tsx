import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addCropStore from '../../../stores/derived/AddCropStore/AddCropStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddCropPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import cropsDatabaseStore from '../../../stores/derived/CropsDatabaseStore/CropsDatabaseStore';

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

    const createDropdownFieldModel = (fieldKey: string) => ({
      ...addCropStore.fields[fieldKey],
      value: String(addCropStore.fields[fieldKey].value),
      options: cropsDatabaseStore.dropdownFilters[fieldKey].options,
      onChange: (value: string | number) =>
        addCropStore.fields[fieldKey].setValue(String(value)),
    });

    const sunPreferenceFieldModel =
      createDropdownFieldModel('sunPreferenceField');
    const waterNeedsFieldModel = createDropdownFieldModel('waterNeedsField');
    const soilTypeFieldModel = createDropdownFieldModel('soilTypeField');
    const soilPHFieldModel = createDropdownFieldModel('soilPHField');
    const pruningFieldModel = createDropdownFieldModel('pruningField');
    const climateZoneFieldModel = createDropdownFieldModel('climateZone');
    const plantTypeFieldModel = createDropdownFieldModel('plantTypeField');
    const growthRateFieldModel = createDropdownFieldModel('growthRateField');
    const fertilizerNeedsFieldModel = createDropdownFieldModel(
      'fertilizerNeedsField',
    );

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
            <Dropdown {...climateZoneFieldModel} />
            <Dropdown {...plantTypeFieldModel} />
            <Dropdown {...growthRateFieldModel} />
            <Dropdown {...fertilizerNeedsFieldModel} />
            <div></div>
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddCropPage;
