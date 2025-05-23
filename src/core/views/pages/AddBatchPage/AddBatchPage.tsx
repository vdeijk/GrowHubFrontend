import React, { useEffect } from 'react';
import TextInput from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import styles from './AddBatchPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import addBatchStore from '../../../stores/derived/AddBatchStore/AddBatchStore';
import DateInput from '../../reusables/DateInput/DateInput';
import { DateInputProps } from '../../reusables/DateInput/DateInput';
import { TextInputProps } from '../../reusables/TextInput/TextInput';
import TextArea from '../../reusables/TextArea/TextArea';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import Divider from '../../reusables/Divider/Divider';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import batchesStore from '../../../stores/derived/BatchesStore/BatchesStore';
import { useTranslation } from 'react-i18next';

interface AddBatchPageProps {
  isEditing?: boolean;
}

const AddBatchPage: React.FC<AddBatchPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    useEffect(() => {
      if (isEditing && id) {
        addBatchStore.loadCrop(id);
      } else {
        addBatchStore.resetForm();
      }
    }, [isEditing, id]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!addBatchStore.validateForm()) return;

      if (isEditing && id) {
        addBatchStore.updateCrop(id);
      } else {
        addBatchStore.addCrop();
      }

      addBatchStore.resetForm();

      navigate('/batchesPage');
    };

    const buttonContainerData: ButtonProps[] = [
      {
        type: 'button',
        onClick: () => navigate('/batchesPage'),
        label: t('addBatchPage.buttons.back'),
      },
      {
        type: 'submit',
        label: isEditing
          ? t('addBatchPage.buttons.editBatch')
          : t('addBatchPage.buttons.addBatch'),
        customStyles: { marginTop: '1rem' },
      },
    ];

    const createTextInputFieldModel = (fieldKey: string): TextInputProps => {
      return {
        ...addBatchStore.inputFields[fieldKey],
        value: String(addBatchStore.inputFields[fieldKey].value || ''),
        onChange: (value: string) =>
          addBatchStore.inputFields[fieldKey].setValue(value),
      };
    };

    const createDropdownFieldModel = (fieldKey: string) => {
      return {
        ...addBatchStore.dropdownFields[fieldKey],
        value: String(addBatchStore.dropdownFields[fieldKey].value || ''),
        options: batchesStore.dropdownFilters[fieldKey]?.options || [],
        onChange: (value: string | number) =>
          addBatchStore.dropdownFields[fieldKey].setValue(String(value)),
      };
    };

    const createDateFieldModel = (fieldKey: string): DateInputProps => ({
      ...addBatchStore.dateFields[fieldKey],
      value: String(addBatchStore.dateFields[fieldKey].value || ''),
      onChange: (value) =>
        addBatchStore.dateFields[fieldKey].setValue(value || ''),
    });

    const commonNameModel = createTextInputFieldModel('commonName');
    const notesModel = createTextInputFieldModel('notes');
    const amountModel = createTextInputFieldModel('amount');
    const cropIdModel = createTextInputFieldModel('cropId');
    const locationFieldModel = createDropdownFieldModel('location');
    const plantedFieldModel = createDateFieldModel('planted');
    const lastWateredFieldModel = createDateFieldModel('lastWatered');
    const lastFertilizedFieldModel = createDateFieldModel('lastFertilized');
    const lastPrunedFieldModel = createDateFieldModel('lastPruned');
    const lastHarvestedFieldModel = createDateFieldModel('lastHarvested');

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addBatchStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...commonNameModel} />
            <TextInput {...cropIdModel} />
            <TextInput {...amountModel} />
            <TextArea {...notesModel} />
            <Divider />
            <Dropdown {...locationFieldModel} />
            <Divider />
            <DateInput {...plantedFieldModel} />
            <DateInput {...lastWateredFieldModel} />
            <DateInput {...lastFertilizedFieldModel} />
            <DateInput {...lastPrunedFieldModel} />
            <DateInput {...lastHarvestedFieldModel} />
            <ButtonContainer
              customStyles={{ gridColumn: '1 / -1' }}
              buttons={buttonContainerData}
            />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddBatchPage;
