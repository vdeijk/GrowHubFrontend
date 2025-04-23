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
import taskStore from '../../../stores/TaskStore/TaskStore';

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
        addTaskStore.updateTask(id);
      } else {
        addTaskStore.addTask();
      }

      addTaskStore.resetForm();

      navigate('/tasksPage');
    };
    const titleProps: TextInputProps = {
      value: String(addTaskStore.fields.titleField.value),
      onChange: (value: string) =>
        addTaskStore.fields.titleField.setValue(value),
      placeholder: 'Title',
      label: 'Title',
      required: true,
    };

    const priorityProps: DropdownProps = {
      value: String(addTaskStore.fields.priorityField.value),
      onChange: (value: string) =>
        addTaskStore.fields.priorityField.setValue(value),
      label: 'Priority',
      required: true,
      options: taskStore.filterCriteria['priority'].options,
    };

    const descriptionProps: TextInputProps = {
      value: String(addTaskStore.fields.descriptionField.value),
      onChange: (value: string) =>
        addTaskStore.fields.descriptionField.setValue(value),
      placeholder: 'Enter description',
      label: 'Description',
      required: true,
    };

    const categoryProps: DropdownProps = {
      value: String(addTaskStore.fields.categoryField.value),
      onChange: (value: string) =>
        addTaskStore.fields.categoryField.setValue(value),
      label: 'Category',
      required: true,
      options: taskStore.filterCriteria['category'].options,
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
