import React, { useEffect } from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addTaskStore from '../../../stores/derived/AddTaskStore/AddTaskStore';
import styles from './AddTaskPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import Button, { ButtonProps } from '../../reusables/Button/Button';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import DateInput, { DateInputProps } from '../../reusables/DateInput/DateInput';
import taskStore from '../../../stores/derived/TaskStore/TaskStore';

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
      if (!addTaskStore.validateForm()) return;

      e.preventDefault();

      if (isEditing && id) {
        addTaskStore.updateTask(id);
      } else {
        addTaskStore.addTask();
      }

      addTaskStore.resetForm();
      navigate('/tasksPage');
    };

    const createTextInputFieldModel = (fieldKey: string): TextInputProps => ({
      ...addTaskStore.fields[fieldKey],
      value: String(addTaskStore.fields[fieldKey].value || ''),
      onChange: (value: string) =>
        addTaskStore.fields[fieldKey].setValue(value),
    });

    const createDropdownFieldModel = (fieldKey: string) => ({
      ...addTaskStore.fields[fieldKey],
      value: String(addTaskStore.fields[fieldKey].value),
      options: taskStore.dropdownFilters[fieldKey]?.options || [],
      onChange: (value: string | number) =>
        addTaskStore.fields[fieldKey].setValue(String(value)),
    });

    const createDateFieldModel = (fieldKey: string): DateInputProps => ({
      ...addTaskStore.fields[fieldKey],
      value: String(addTaskStore.fields[fieldKey].value || ''),
      onChange: (value) => addTaskStore.fields[fieldKey].setValue(value || ''),
    });

    const titleProps = createTextInputFieldModel('titleField');
    const priorityProps = createDropdownFieldModel('priority');
    const dueDateProps = createDateFieldModel('dueDate');
    const descriptionProps = createTextInputFieldModel('description');
    const categoryProps = createDropdownFieldModel('category');
    const statusProps = createDropdownFieldModel('todoStatus');

    const buttonProps: ButtonProps = {
      type: 'submit',
      label: isEditing ? 'Edit AgriTask' : 'Add AgriTask',
      customStyles: { marginTop: '1rem' },
    };

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addTaskStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...titleProps} />
            <Dropdown {...priorityProps} />
            <DateInput {...dueDateProps} />
            <TextInput {...descriptionProps} />
            <Dropdown {...categoryProps} />
            <Dropdown {...statusProps} />
            <div></div>
            <Button {...buttonProps} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddTaskPage;
