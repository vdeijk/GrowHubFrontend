import React from 'react';
import SearchBarCrops from '../../containers/SearchBarCrops/SearchBarCrops';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './YourCropsPage.module.css';
import cropsStore from '../../../stores/YourCropsStore/YourCropsStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { SearchBarProps } from '../../containers/SearchBarCrops/SearchBarCrops';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import Pagination from '../../reusables/Pagination/Pagination';
import { YourCrop } from '../../../../auxiliary/interfaces/YourCrop';

const YourCropsPage: React.FC = observer(() => {
  const { paginationStore } = cropsStore;
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    searchQuery: cropsStore.searchQuery,
    location: cropsStore.dropdownFilters.location,
    waterNeeds: cropsStore.dropdownFilters.waterNeeds,
    healthStatus: cropsStore.dropdownFilters.healthStatus,
    lastWatered: cropsStore.dateFilters.lastWatered,
    lastFertilized: cropsStore.dateFilters.lastFertilized,
    lastPruned: cropsStore.dateFilters.lastPruned,
    lastHarvested: cropsStore.dateFilters.lastHarvested,
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addCropPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    cropsStore.deletePlant(id);
  };

  const tableProps: TableProps<YourCrop> = {
    headers: cropsStore.tableHeaders,
    data: cropsStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <div className={styles.actionIcons}>
          <ActionIcons
            item={item as { id: number | undefined }}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      ),
    })),
    onSort: (field) => cropsStore.setSortField(field),
    sortField: cropsStore.sortField,
    sortOrder: cropsStore.sortOrder,
  };

  const buttonContainerData = {
    clickHandler: () => navigate('/addCropPage'),
    label: 'Add Crop',
  };

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={cropsStore.isLoading}>
        <SearchBarCrops {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <div className={styles.tableContainer}>
            <TableWithSorting {...tableProps} />
          </div>
          <ButtonContainer buttons={[buttonContainerData]} />
        </div>
        <Pagination
          currentPage={paginationStore.currentPage}
          totalPages={paginationStore.totalPages}
          onPageChange={(page) => paginationStore.setCurrentPage(page)}
        />
      </LoadingWrapper>
    </section>
  );
});

export default YourCropsPage;
