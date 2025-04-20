import React, { useEffect } from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addCropStore from '../../../stores/AddCropStore/AddCropStore';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import styles from './AddCropPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

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

      if (isEditing && id) {
        addCropStore.updateCrop(id);
      } else {
        addCropStore.addCrop();
      }

      addCropStore.resetForm();

      navigate('/cropsPage');
    };
    const nameProps: TextInputProps = {
      value: addCropStore.commonName,
      onChange: (value: string) =>
        addCropStore.updateFormField('commonName', value),
      placeholder: 'Common Name',
      label: 'Common Name',
      required: true,
    };

    const sunPreferenceProps: TextInputProps = {
      value: addCropStore.genus,
      onChange: (value: string) => addCropStore.updateFormField('genus', value),
      placeholder: 'Genus',
      label: 'Genus',
      required: true,
    };

    const waterNeedsProps: TextInputProps = {
      value: addCropStore.scientificName,
      onChange: (value: string) =>
        addCropStore.updateFormField('scientificName', value),
      placeholder: 'Scientific Name',
      label: 'Scientific Name',
      required: true,
    };

    const buttonProps: ButtonProps = {
      type: 'submit',
      onClick: () => navigate('/tasksPage'),
      label: isEditing ? 'Edit Crop' : 'Add Crop',
      customStyles: { marginTop: '1rem' },
    };

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addCropStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...nameProps} />
            <TextInput {...sunPreferenceProps} />
            <TextInput {...waterNeedsProps} />
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddCropPage;
