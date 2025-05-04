import React, { useEffect } from 'react';
import TextInput, { TextInputProps } from '../../reusables/TextInput/TextInput';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import addTaskStore from '../../../stores/derived/AddTaskStore/AddTaskStore';
import styles from './AddTaskPage.module.css';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import DateInput, { DateInputProps } from '../../reusables/DateInput/DateInput';
import taskStore from '../../../stores/derived/TasksStore/TasksStore';
import TextArea from '../../reusables/TextArea/TextArea';
import Divider from '../../reusables/Divider/Divider';

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
      ...addTaskStore.inputFields[fieldKey],
      value: String(addTaskStore.inputFields[fieldKey].value || ''),
      onChange: (value: string) =>
        addTaskStore.inputFields[fieldKey].setValue(value),
    });

    const createDropdownFieldModel = (fieldKey: string) => ({
      ...addTaskStore.dropdownFields[fieldKey],
      value: String(addTaskStore.dropdownFields[fieldKey].value),
      options: taskStore.dropdownFilters[fieldKey]?.options || [],
      onChange: (value: string | number) =>
        addTaskStore.dropdownFields[fieldKey].setValue(String(value)),
    });

    const createDateFieldModel = (fieldKey: string): DateInputProps => ({
      ...addTaskStore.dateFields[fieldKey],
      value: String(addTaskStore.dateFields[fieldKey].value || ''),
      onChange: (value) =>
        addTaskStore.dateFields[fieldKey].setValue(value || ''),
    });

    const titleProps = createTextInputFieldModel('titleField');
    const notesProps = createTextInputFieldModel('notes');
    const priorityProps = createDropdownFieldModel('priority');
    const dueDateProps = createDateFieldModel('dueDate');
    const categoryProps = createDropdownFieldModel('category');
    const statusProps = createDropdownFieldModel('todoStatus');

    const buttonContainerData: ButtonProps[] = [
      {
        type: 'button',
        onClick: () => navigate('/tasksPage'),
        label: 'Back',
      },
      {
        type: 'submit',
        onClick: () => navigate('/tasksPage'),
        label: isEditing ? 'Edit Task' : 'Add Task',
        customStyles: { marginTop: '1rem' },
      },
    ];

    return (
      <section className={styles.section}>
        <LoadingWrapper isLoading={addTaskStore.isLoading}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput {...titleProps} />
            <TextArea {...notesProps} />
            <Divider />
            <Dropdown {...priorityProps} />
            <Dropdown {...categoryProps} />
            <Dropdown {...statusProps} />
            <DateInput {...dueDateProps} />
            <div></div> <ButtonContainer buttons={buttonContainerData} />
          </form>
        </LoadingWrapper>
      </section>
    );
  },
);

export default AddTaskPage;
