import React from 'react';
import SearchBarDatabase from '../../containers/SearchBarDatabase/SearchBarDatabase';
import Table from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './CropsDatabasePage.module.css';
import cropsDatabaseStore from '../../../stores/derived/CropsDatabaseStore/CropsDatabaseStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Pagination from '../../reusables/Pagination/Pagination';
import { SearchBarDatabaseProps } from '../../containers/SearchBarDatabase/SearchBarDatabase';
import { PlantItem } from '../../../../api';
import popupService from '../../../services/PopupService/PopupService';
import TaskPopup from '../../reusables/TaskPopup/TaskPopup';
import Popup from '../../containers/Popup/Popup';

const CropsDatabasePage: React.FC = observer(() => {
  const navigate = useRouterNavigation();
  const { paginationService } = cropsDatabaseStore;

  const searchBarProps: SearchBarDatabaseProps = {
    searchQuery: cropsDatabaseStore.textFilters.searchQuery,
    harvestStart: cropsDatabaseStore.dateFilters['harvestStart'],
    harvestEnd: cropsDatabaseStore.dateFilters['harvestEnd'],
    pruningStart: cropsDatabaseStore.dateFilters['pruningStart'],
    pruningEnd: cropsDatabaseStore.dateFilters['pruningEnd'],
    fertilizingStart: cropsDatabaseStore.dateFilters['fertilizingStart'],
    fertilizingEnd: cropsDatabaseStore.dateFilters['fertilizingEnd'],
    isLoading: cropsDatabaseStore.isLoading,
    handleSync: cropsDatabaseStore.syncData,
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addCropPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    cropsDatabaseStore.deletePlant(id);
  };

  const handlePopup = (id: number | undefined) => {
    if (id === undefined) return;

    const task = cropsDatabaseStore.items.find((item) => item.id === id);
    if (!task) return;

    popupService.openPopup(
      <TaskPopup
        descriptionField={{
          ...cropsDatabaseStore.textFilters.descriptionField,
          setValue: (value) =>
            cropsDatabaseStore.textFilters.descriptionField.setValue(
              value ?? '',
            ),
        }}
      />,
    );
  };

  const tableProps: TableProps<PlantItem> = {
    headers: cropsDatabaseStore.tableHeaders as {
      id: keyof PlantItem;
      label: string;
      sortable: boolean;
    }[],
    data: cropsDatabaseStore.paginatedItems.map((item) => ({
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
    onSort: (field) => cropsDatabaseStore.sortItems(field),
    sortField: cropsDatabaseStore.sortField,
    sortOrder: cropsDatabaseStore.sortOrder,
  };

  const buttonContainerData = {
    clickHandler: () => navigate('/addCropPage'),
    label: 'Add Crop',
  };

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={cropsDatabaseStore.isLoading}>
        <SearchBarDatabase {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <div className={styles.tableContainer}>
            <Table {...tableProps} />
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

export default CropsDatabasePage;
