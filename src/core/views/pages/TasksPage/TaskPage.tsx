import React from 'react';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import taskStore from '../../../stores/derived/TasksStore/TasksStore';
import styles from './TasksPage.module.css';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { TodoItem } from '../../../../api';
import SearchBarTasks from '../../containers/SearchBarTasks/SearchBarTasks';
import { SearchBarTasksProps } from '../../containers/SearchBarTasks/SearchBarTasks';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Popup from '../../containers/Popup/Popup';
import Pagination from '../../reusables/Pagination/Pagination';
import NotesPopup from '../../reusables/NotesPopup/NotesPopup';
import popupService from '../../../services/PopupService/PopupService';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

const TasksPage: React.FC = observer(() => {
  const paginationService = taskStore.paginationService;
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/addTaskPage'),
    label: 'Add Task',
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addTaskPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    taskStore.deleteTask(id);
  };

  const searchBarProps: SearchBarTasksProps = {
    searchQuery: taskStore.textFilters.searchQuery,
    categoryFilter: taskStore.dropdownFilters['category'],
    priorityFilter: taskStore.dropdownFilters['priority'],
    statusFilter: taskStore.dropdownFilters['todoStatus'],
    startDateFilter: taskStore.dateFilters['startDate'],
    endDateFilter: taskStore.dateFilters['endDate'],
  };

  const handlePopup = (id: number | undefined) => {
    if (id === undefined) return;

    const task = taskStore.items.find((item) => item.id === id);
    if (!task) return;

    taskStore.textFilters.description.setValue(task.notes ?? '');

    popupService.openPopup(
      <NotesPopup
        description={taskStore.textFilters.description}
        title={'Task Notes'}
      />,
    );
  };

  const tableProps: TableProps<TodoItem> = {
    headers: taskStore.tableHeaders as TableHeaderModel<TodoItem>[],
    data: taskStore.paginatedItems.map((item) => ({
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
    onSort: (field) => taskStore.sortItems(field as keyof TodoItem),
    sortField: taskStore.sortField,
    sortOrder: taskStore.sortOrder,
  };

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={taskStore.isLoading}>
        <SearchBarTasks {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <div className={styles.tableContainer}>
            <TableWithSorting {...tableProps} />
          </div>
          <ButtonContainer buttons={[buttonContainerData]} />
        </div>
        <Pagination
          currentPage={paginationService.currentPage}
          totalPages={paginationService.totalPages}
          onPageChange={(page) => paginationService.setCurrentPage(page)}
        />
      </LoadingWrapper>
    </section>
  );
});

export default TasksPage;
