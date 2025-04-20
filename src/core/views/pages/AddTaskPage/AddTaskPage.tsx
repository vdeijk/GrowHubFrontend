import React, { useEffect } from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addTaskStore from '../../../stores/AddTaskStore/AddTaskStore';
import styles from './AddTaskPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import Dropdown from '../../reusables/Dropdown/Dropdown';
//import DateInput from '../../reusables/DateInput/DateInput';
import { DropdownProps } from '../../reusables/Dropdown/Dropdown';

interface AddTaskPageProps {
  isEditing?: boolean;
}

const AddTaskPage: React.FC<AddTaskPageProps> = observer(
  ({ isEditing = false }) => {
    const navigate = useRouterNavigation();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
      if (isEditing && id) {
        addTaskStore.loadTask(id);
      } else {
        addTaskStore.resetForm();
      }
    }, [isEditing, id]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (isEditing && id) {
        addTaskStore.updateCrop(id);
      } else {
        addTaskStore.addCrop();
      }

      addTaskStore.resetForm();

      navigate('/cropsPage');
    };
    const titleProps: TextInputProps = {
      value: addTaskStore.title,
      onChange: (value: string) =>
        addTaskStore.updateFormField('title', value),
      placeholder: 'Title',
      label: 'Title',
      required: true,
    };

    const priorityProps: DropdownProps = {
      value: addTaskStore.priority,
      onChange: (value: string) => addTaskStore.updateFormField('priority', value),
      label: 'Priority',
      required: true,
    };

    const descriptionProps: TextInputProps = {
      value: addTaskStore.description,
      onChange: (value: string) =>
        addTaskStore.updateFormField('description', value),
      placeholder: 'Enter description',
      label: 'Description',
      required: true,
    };

    const categoryProps: DropdownProps = {
      value: addTaskStore.category,
      onChange: (value: string) =>
        addTaskStore.updateFormField('category', value),
      label: 'Category',
      required: true,
    };

    const buttonProps: ButtonProps = {
      type: 'submit',
      onClick: () => navigate('/tasksPage'),
      label: isEditing ? 'Edit AgriTask' : 'Add AgriTask',
      customStyles: { marginTop: '1rem' },
    };

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addTaskStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...titleProps} />
            <Dropdown {...priorityProps} />
            {/* <DateInput {...waterNeedsProps} /> */}
            <TextInput {...descriptionProps} />
            <Dropdown {...categoryProps} />
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddTaskPage;
