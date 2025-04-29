import React from 'react';
import SearchBarDatabase from '../../containers/SearchBarDatabase/SearchBarDatabase';
import Table from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './CropsDatabasePage.module.css';
import cropsDatabaseStore from '../../../stores/CropsDatabaseStore/CropsDatabaseStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { Plant } from '../../../../auxiliary/interfaces/Plant';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Pagination from '../../reusables/Pagination/Pagination';
import { SearchBarDatabaseProps } from '../../containers/SearchBarDatabase/SearchBarDatabase';

const CropsDatabasePage: React.FC = observer(() => {
  const navigate = useRouterNavigation();
  const { paginationService } = cropsDatabaseStore;

  const searchBarProps: SearchBarDatabaseProps = {
    searchQuery: cropsDatabaseStore.searchQuery,
    sunPreference: cropsDatabaseStore.dropdownFilters['sunPreference'],
    waterNeeds: cropsDatabaseStore.dropdownFilters['waterNeeds'],
    soilType: cropsDatabaseStore.dropdownFilters['soilType'],
    soilPH: cropsDatabaseStore.dropdownFilters['soilPH'],
    pruning: cropsDatabaseStore.dropdownFilters['pruning'],
    climateZone: cropsDatabaseStore.dropdownFilters['climateZone'],
    plantType: cropsDatabaseStore.dropdownFilters['plantType'],
    growthRate: cropsDatabaseStore.dropdownFilters['growthRate'],
    fertilizerNeeds: cropsDatabaseStore.dropdownFilters['fertilizerNeeds'],
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

  const tableProps: TableProps<Plant> = {
    headers: cropsDatabaseStore.tableHeaders,
    data: cropsDatabaseStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
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
