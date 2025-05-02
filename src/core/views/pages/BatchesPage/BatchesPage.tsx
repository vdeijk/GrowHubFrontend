import React from 'react';
import SearchBarCrops from '../../containers/SearchBarCrops/SearchBarCrops';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './BatchesPage.module.css';
import cropsStore from '../../../stores/derived/BatchesStore/BatchesStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { SearchBarProps } from '../../containers/SearchBarCrops/SearchBarCrops';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Pagination from '../../reusables/Pagination/Pagination';
import { YourCropItem } from '../../../../api';
import NotesPopup from '../../reusables/NotesPopup/NotesPopup';
import popupService from '../../../services/PopupService/PopupService';
import Popup from '../../containers/Popup/Popup';
import yourCropsStore from '../../../stores/derived/BatchesStore/BatchesStore';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

const BatchesPage: React.FC = observer(() => {
  const { paginationService } = cropsStore;
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    searchQuery: cropsStore.textFilters.searchQuery,
    location: cropsStore.dropdownFilters.location,
    lastWatered: cropsStore.dateFilters.lastWatered,
    lastFertilized: cropsStore.dateFilters.lastFertilized,
    lastPruned: cropsStore.dateFilters.lastPruned,
    lastHarvested: cropsStore.dateFilters.lastHarvested,
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addYourCropPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    cropsStore.deletePlant(id);
  };

  const handlePopup = (id: number | undefined) => {
    if (id === undefined) return;

    const task = yourCropsStore.items.find((item) => item.id === id);
    if (!task) return;

    yourCropsStore.textFilters.description.setValue(task.notes ?? '');

    popupService.openPopup(
      <NotesPopup
        description={yourCropsStore.textFilters.description}
        title={'Batch Notes'}
      />,
    );
  };

  const tableProps: TableProps<YourCropItem> = {
    headers: yourCropsStore.tableHeaders as TableHeaderModel<YourCropItem>[],
    data: cropsStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <div className={styles.actionIcons}>
          <ActionIcons
            item={item as { id: number | undefined }}
            handlePopup={handlePopup}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      ),
    })),
    onSort: (field: keyof YourCropItem) => cropsStore.sortItems(field),
    sortField: cropsStore.sortField,
    sortOrder: cropsStore.sortOrder,
  };

  const buttonContainerData = {
    clickHandler: () => navigate('/addYourCropPage'),
    label: 'Add Batch',
  };

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={cropsStore.isLoading}>
        <SearchBarCrops {...searchBarProps} />
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

export default BatchesPage;
