import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addCropStore from '../../../stores/derived/AddCropStore/AddCropStore';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import styles from './AddCropPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { TextInputProps } from '../../reusables/TextInput/TextInput';
import TextArea from '../../reusables/TextArea/TextArea';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import Divider from '../../reusables/Divider/Divider';
import { useTranslation } from 'react-i18next';

interface AddCropPageProps {
  isEditing?: boolean;
}

const AddCropPage: React.FC<AddCropPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

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

      navigate('/cropsPage');
    };

    const buttonContainerData: ButtonProps[] = [
      {
        type: 'button',
        onClick: () => navigate('/cropsPage'),
        label: t('addCropPage.buttons.back'),
      },
      {
        type: 'submit',
        label: isEditing
          ? t('addCropPage.buttons.editCrop')
          : t('addCropPage.buttons.addCrop'),
        customStyles: { marginTop: '1rem' },
      },
    ];

    const createTextInputFieldModel = (fieldKey: string): TextInputProps => {
      return {
        ...addCropStore.inputFields[fieldKey],
        value: String(addCropStore.inputFields[fieldKey].value || ''),
        onChange: (value: string) =>
          addCropStore.inputFields[fieldKey].setValue(value),
      };
    };

    const createDropdownFieldModel = (fieldKey: string) => {
      return {
        ...addCropStore.dropdownFields[fieldKey],
        value: String(addCropStore.dropdownFields[fieldKey].value),
        options: addCropStore.dropdownFields[fieldKey]?.options || [],
        onChange: (value: string | number) =>
          addCropStore.dropdownFields[fieldKey].setValue(String(value)),
      };
    };

    const commonName = createTextInputFieldModel('commonName');
    const notes = createTextInputFieldModel('notes');
    const waterCycle = createTextInputFieldModel('waterCycle');
    const pruningCycle = createTextInputFieldModel('pruningCycle');
    const fertilizationCycle = createTextInputFieldModel('fertilizationCycle');
    const harvestCycle = createTextInputFieldModel('harvestCycle');
    const phMin = createTextInputFieldModel('phMin');
    const phMax = createTextInputFieldModel('phMax');
    const temperatureMin = createTextInputFieldModel('temperatureMin');
    const temperatureMax = createTextInputFieldModel('temperatureMax');

    const harvestStart = createDropdownFieldModel('harvestStart');
    const harvestEnd = createDropdownFieldModel('harvestEnd');
    const pruningStart = createDropdownFieldModel('pruningStart');
    const pruningEnd = createDropdownFieldModel('pruningEnd');
    const fertilizingStart = createDropdownFieldModel('fertilizingStart');
    const fertilizingEnd = createDropdownFieldModel('fertilizingEnd');

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addCropStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...commonName} />
            <TextArea {...notes} />
            <TextInput {...waterCycle} />
            <TextInput {...pruningCycle} />
            <TextInput {...fertilizationCycle} />
            <TextInput {...harvestCycle} />
            <TextInput {...phMin} />
            <TextInput {...phMax} />
            <TextInput {...temperatureMin} />
            <TextInput {...temperatureMax} />
            <Divider />
            <Dropdown {...harvestStart} />
            <Dropdown {...harvestEnd} />
            <Dropdown {...pruningStart} />
            <Dropdown {...pruningEnd} />
            <Dropdown {...fertilizingStart} />
            <Dropdown {...fertilizingEnd} />
            <div></div> <ButtonContainer buttons={buttonContainerData} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddCropPage;
