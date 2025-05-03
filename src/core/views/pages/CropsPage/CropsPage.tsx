import React from 'react';
import SearchBar from '../../containers/SearchBar/Searchbar';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './CropsPage.module.css';
import cropsStore from '../../../stores/derived/CropsStore/CropsStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Pagination from '../../reusables/Pagination/Pagination';
import { PlantItem } from '../../../../api';
import popupService from '../../../services/PopupService/PopupService';
import NotesPopup from '../../reusables/NotesPopup/NotesPopup';
import Popup from '../../layouts/Popup/Popup';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import SyncButton from '../../reusables/SyncButton/SyncButton';
import { SearchBarProps } from '../../containers/SearchBar/Searchbar';

const CropsPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();
  const { paginationService } = cropsStore;

  const searchBarProps: SearchBarProps = {
    inputFields: Object.values(cropsStore.textFilters),
    dateFields: Object.values(cropsStore.dateFilters),
    dropdownFields: Object.values(cropsStore.dropdownFilters),
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addCropPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    cropsStore.deletePlant(id);
  };

  const handlePopup = (id: number | undefined) => {
    if (id === undefined) return;

    const task = cropsStore.items.find((item) => item.id === id);
    if (!task) return;

    cropsStore.textFilters.description.setValue(task.notes ?? '');

    popupService.openPopup(
      <NotesPopup
        description={cropsStore.textFilters.description}
        title={'Crop Notes'}
      />,
    );
  };

  const tableProps: TableProps<PlantItem> = {
    headers: cropsStore.tableHeaders as TableHeaderModel<PlantItem>[],
    data: cropsStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
          handlePopup={handlePopup}
          item={item as { id: number | undefined }}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ),
    })),
    onSort: (field) => cropsStore.sortItems(field),
    sortField: cropsStore.sortField,
    sortOrder: cropsStore.sortOrder,
  };

  const buttonContainerData = {
    clickHandler: () => navigate('/addCropPage'),
    label: 'Add Crop',
  };

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={cropsStore.isLoading}>
        <SearchBar {...searchBarProps} />
        <div className={styles.contentContainer}>
          <div className={styles.tableContainer}>
            <TableWithSorting {...tableProps} />
          </div>
          <div className={styles.buttonContainer}>
            <SyncButton
              onClick={cropsStore.syncData}
              isSyncing={cropsStore.isLoading}
            />
            <ButtonContainer buttons={[buttonContainerData]} />
          </div>
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

export default CropsPage;
