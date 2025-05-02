import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddYourCropPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import addYourCropStore from '../../../stores/derived/AddYourCropStore/AddYourCropStore';
import DateInput from '../../reusables/DateInput/DateInput';
import { DateInputProps } from '../../reusables/DateInput/DateInput';
import yourCropsStore from '../../../stores/derived/YourCropsStore/YourCropsStore';

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

    const createDropdownFieldModel = (fieldKey: string) => ({
      ...addYourCropStore.fields[fieldKey],
      value: String(addYourCropStore.fields[fieldKey].value),
      options: yourCropsStore.dropdownFilters[fieldKey].options,
      onChange: (value: string | number) =>
        addYourCropStore.fields[fieldKey].setValue(String(value)),
    });

    const createDateFieldModel = (fieldKey: string): DateInputProps => ({
      ...addYourCropStore.fields[fieldKey],
      value: String(addYourCropStore.fields[fieldKey].value || ''),
      onChange: (value) =>
        addYourCropStore.fields[fieldKey].setValue(value || ''),
    });

    const locationFieldModel = createDropdownFieldModel('location');
    const lastWateredFieldModel = createDateFieldModel('lastWatered');
    const lastFertilizedFieldModel = createDateFieldModel('lastFertilized');
    const lastPrunedFieldModel = createDateFieldModel('lastPruned');
    const lastHarvestedFieldModel = createDateFieldModel('lastHarvested');

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addYourCropStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...nameFieldModel} />
            <Dropdown {...locationFieldModel} />
            <DateInput {...lastWateredFieldModel} />
            <DateInput {...lastFertilizedFieldModel} />
            <DateInput {...lastPrunedFieldModel} />
            <DateInput {...lastHarvestedFieldModel} />
            <div></div>
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddYourCropPage;
