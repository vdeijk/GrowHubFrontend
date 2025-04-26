import React from 'react';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './TasksPage.module.css';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { Task } from '../../../../auxiliary/interfaces/Task';
import SearchBarTasks from '../../containers/SearchBarTasks/SearchBarTasks';
import { SearchBarTasksProps } from '../../containers/SearchBarTasks/SearchBarTasks';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import popupStore from '../../../stores/PopupStore/PopupStore';
import PlantDatabasePopup from '../../reusables/PlantDatabasePopup/PlantDatabasePopup';
import Popup from '../../containers/Popup/Popup';

const TasksPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/addTaskPage'),
    label: 'Add AgriTask',
  };

  const handlePopup = (id: number | undefined) => {
    popupStore.openPopup(<PlantDatabasePopup />);
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addTaskPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

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
    data: taskStore.filteredItems.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
          item={item as { id: number | undefined }}
          handlePopup={handlePopup}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ),
    })),
    onSort: (field) => taskStore.setSortField(field),
    sortField: taskStore.sortField,
    sortOrder: taskStore.sortOrder,
  };

  return (
    <section className={styles.taskPage}>
      <Popup />
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
