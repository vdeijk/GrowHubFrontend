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
import { useDeleteConfirmation } from '../../../../auxiliary/hooks/useDeleteConfirmation';
import i18next from 'i18next';
import copyPasteStore from '../../../stores/derived/CopyPasteStore/CopyPasteStore';

const TasksPage: React.FC = observer(() => {
  const paginationService = taskStore.paginationService;
  const navigate = useRouterNavigation();

  const buttonContainerData = [
    {
      onClick: () => navigate('/addTaskPage'),
      label: i18next.t('tasksPage.buttons.addTask'),
    },
  ];

  const handlePaste = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    copyPasteStore.pasteBatchIntoTask(id);
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addTaskPage/${id}`);
  };

  const { openDeleteConfirmation } = useDeleteConfirmation(
    taskStore.deleteTask,
    i18next.t('tasksPage.deleteConfirmation.message'),
  );

  const handleDelete = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    event.stopPropagation();
    openDeleteConfirmation(id);
  };

  const searchBarProps: SearchBarProps = {
    inputFields: Object.values(taskStore.stringFilters),
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
          handleDelete={handleDelete}
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
