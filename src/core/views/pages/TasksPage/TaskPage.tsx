import React from 'react';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './TasksPage.module.css';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { Task } from '../../../../auxiliary/interfaces/Task';
import SearchBarTasks from '../../containers/SearchBarTasks/SearchBarTasks';
import { SearchBarTasksProps } from '../../containers/SearchBarTasks/SearchBarTasks';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';

const TasksPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/addTaskPage'),
    label: 'Add AgriTask',
  };

  const handleEdit = (id: number) => {
    navigate(`/addTaskPage/${id}`);
  };

  const handleDelete = (id: number) => {
    taskStore.deleteTask(id);
  };

  const searchBarProps: SearchBarTasksProps = {
    searchQuery: taskStore.searchQuery,
    categoryFilter: taskStore.dropdownFilters['category'],
    priorityFilter: taskStore.dropdownFilters['priority'],
    startDateFilter: taskStore.dateFilters['startDate'],
    endDateFilter: taskStore.dateFilters['endDate'],
  };

  const tableProps: TableProps<Task> = {
    headers: taskStore.tableHeaders,
    data: taskStore.filteredItems.map((task) => ({
      ...task,
      actions: (
        <div className={styles.actionIcons}>
          <FaEdit
            className={styles.editIcon}
            onClick={() => task.id !== undefined && handleEdit(task.id)}
            title="Edit Plant"
          />
          <FaTrash
            className={styles.deleteIcon}
            onClick={() => task.id !== undefined && handleDelete(task.id)}
            title="Delete Plant"
          />
        </div>
      ),
    })),
    onSort: (field) => taskStore.setSortField(field),
    sortField: taskStore.sortField,
    sortOrder: taskStore.sortOrder,
  };

  return (
    <section className={styles.taskPage}>
      <LoadingWrapper isLoading={taskStore.isLoading}>
        <SearchBarTasks {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <TableWithSorting {...tableProps} />
          <ButtonContainer buttons={[buttonContainerData]} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default TasksPage;
