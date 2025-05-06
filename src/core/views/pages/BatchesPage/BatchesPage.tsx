import React from 'react';
import SearchBar from '../../containers/SearchBar/Searchbar';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './BatchesPage.module.css';
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
import { useDeleteConfirmation } from '../../../../auxiliary/hooks/useDeleteConfirmation';
import i18next from 'i18next';
import copyPasteStore from '../../../stores/derived/CopyPasteStore/CopyPasteStore';

const BatchesPage: React.FC = observer(() => {
  const { paginationService } = batchesStore;
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    inputFields: Object.values(batchesStore.stringFilters).concat(
      Object.values(batchesStore.numberFilters),
    ),
    dateFields: Object.values(batchesStore.dateFilters),
    dropdownFields: Object.values(batchesStore.dropdownFilters),
  };

  const { openDeleteConfirmation } = useDeleteConfirmation(
    batchesStore.deletePlant,
    i18next.t('batchesPage.deleteConfirmation.message'),
  );

  const handleEdit = (id: number | undefined) => {
    navigate(`/addBatchPage/${id}`);
  };

  const handleDelete = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    event.stopPropagation();
    openDeleteConfirmation(id);
  };

  const handleCopy = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    const batchToCopy = batchesStore.items.find((item) => item.id === id);

    if (!batchToCopy) return;

    copyPasteStore.copyItem('Batch', id, batchToCopy.commonName ?? '');
  };

  const handlePaste = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    copyPasteStore.pasteCropIntoBatches(id);
  };

  const tableProps: TableProps<YourCropItem> = {
    headers: batchesStore.tableHeaders as TableHeaderModel<YourCropItem>[],
    data: batchesStore.paginatedItems.map((item) => ({
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
    onSort: (field: keyof YourCropItem) => batchesStore.sortItems(field),
    sortField: batchesStore.sortField as 'id' | null,
    sortOrder: batchesStore.sortOrder,
    handleEdit,
  };

  const buttonContainerData = [
    {
      onClick: () => navigate('/addBatchPage'),
      label: i18next.t('batchesPage.buttons.addBatch'),
    },
  ];

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={batchesStore.isLoading}>
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
