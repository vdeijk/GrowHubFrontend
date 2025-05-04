import React from 'react';
import SearchBar from '../../containers/SearchBar/Searchbar';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './BatchesPage.module.css';
import cropsStore from '../../../stores/derived/BatchesStore/BatchesStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { SearchBarProps } from '../../containers/SearchBar/Searchbar';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Pagination from '../../reusables/Pagination/Pagination';
import { YourCropItem } from '../../../../api';
import Popup from '../../layouts/Popup/Popup';
import batchesStore from '../../../stores/derived/BatchesStore/BatchesStore';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

const BatchesPage: React.FC = observer(() => {
  const { paginationService } = cropsStore;
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    inputFields: Object.values(cropsStore.textFilters),
    dateFields: Object.values(cropsStore.dateFilters),
    dropdownFields: Object.values(cropsStore.dropdownFilters),
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addBatchPage/${id}`);
  };

  const handleDelete = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    cropsStore.deletePlant(id);
  };

  const handleCopy = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    const batchToCopy = cropsStore.items.find((item) => item.id === id);
    if (!batchToCopy) return;
  };

  const handlePaste = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    const targetBatch = cropsStore.items.find((item) => item.id === id);
    if (!targetBatch) return;
  };

  const tableProps: TableProps<YourCropItem> = {
    headers: batchesStore.tableHeaders as TableHeaderModel<YourCropItem>[],
    data: cropsStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <div className={styles.actionIcons}>
          <ActionIcons
            item={item as { id: number | undefined }}
            handleDelete={handleDelete}
            handleCopy={(
              id: number | undefined,
              event: React.MouseEvent<SVGElement>,
            ) => handleCopy(id, event)}
            handlePaste={(
              id: number | undefined,
              event: React.MouseEvent<SVGElement>,
            ) => handlePaste(id, event)}
          />
        </div>
      ),
    })),
    onSort: (field: keyof YourCropItem) => cropsStore.sortItems(field),
    sortField: cropsStore.sortField as 'id' | null,
    sortOrder: cropsStore.sortOrder,
    handleEdit,
  };

  const buttonContainerData = [
    {
      onClick: () => navigate('/addBatchPage'),
      label: 'Add Batch',
    },
  ];

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={cropsStore.isLoading}>
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

export default BatchesPage;

/*

  const handlePopup = (id: number | undefined) => {
    if (id === undefined) return;

    const task = batchesStore.items.find((item) => item.id === id);
    if (!task) return;

    batchesStore.textFilters.description.setValue(task.notes ?? '');

    popupService.openPopup(
      <NotesPopup
        description={batchesStore.textFilters.description}
        title={'Batch Notes'}
      />,
    );
  };*/
