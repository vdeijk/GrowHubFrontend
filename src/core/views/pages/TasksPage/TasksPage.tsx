import React from 'react';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import taskStore from '../../../stores/derived/TasksStore/TasksStore';
import styles from './TasksPage.module.css';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { TodoItem } from '../../../../api';
import { SearchBarProps } from '../../containers/SearchBar/Searchbar';
import SearchBar from '../../containers/SearchBar/Searchbar';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Popup from '../../layouts/Popup/Popup';
import Pagination from '../../reusables/Pagination/Pagination';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

const TasksPage: React.FC = observer(() => {
  const paginationService = taskStore.paginationService;
  const navigate = useRouterNavigation();

  const buttonContainerData = [
    {
      onClick: () => navigate('/addTaskPage'),
      label: 'Add Task',
    },
  ];

  const handlePaste = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addTaskPage/${id}`);
  };

  const handleDelete = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    taskStore.deleteTask(id);
  };

  const searchBarProps: SearchBarProps = {
    inputFields: Object.values(taskStore.textFilters),
    dateFields: Object.values(taskStore.dateFilters),
    dropdownFields: Object.values(taskStore.dropdownFilters),
  };

  const tableProps: TableProps<TodoItem> = {
    headers: taskStore.tableHeaders as TableHeaderModel<TodoItem>[],
    data: taskStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
          item={item as { id: number | undefined }}
          handleDelete={(
            id: number | undefined,
            event: React.MouseEvent<SVGElement>,
          ) => handleDelete(id, event)}
          handlePaste={(
            id: number | undefined,
            event: React.MouseEvent<SVGElement>,
          ) => handlePaste(id, event)}
        />
      ),
    })),
    onSort: (field) => taskStore.sortItems(field as keyof TodoItem),
    sortField: taskStore.sortField,
    sortOrder: taskStore.sortOrder,
    handleEdit,
  };

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={taskStore.isLoading}>
        <SearchBar {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <div className={styles.tableContainer}>
            <TableWithSorting {...tableProps} />
          </div>
          <ButtonContainer buttons={buttonContainerData} />
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
