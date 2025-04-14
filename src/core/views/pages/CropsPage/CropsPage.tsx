import React from 'react';
import SearchBarContainer from '../../containers/SearchBarContainer/SearchBarContainer';
import Table from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './CropsPage.module.css';
import plantsStore from '../../../stores/CropsStore/CropsStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { SearchBarProps } from '../../containers/SearchBarContainer/SearchBarContainer';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { Plant } from '../../../../auxiliary/interfaces/Plant';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const CropsPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    searchQuery: plantsStore.searchQuery.value,
    error: plantsStore.searchQuery.error,
    setSearchQuery: plantsStore.setSearchQuery,
    filterCriteria: plantsStore.filterCriteria,
    setFilterCriteria: plantsStore.setFilterCriteria,
    genusOptions: plantsStore.genusOptions,
  };

  const tableProps: TableProps<Plant> = {
    headers: plantsStore.tableHeaders,
    data: plantsStore.filteredPlants.map((plant) => ({
      ...plant,
      actions: (
        <div className={styles.actionIcons}>
          <FaEdit
            className={styles.editIcon}
            onClick={() => plant.id !== undefined && handleEdit(plant.id)}
            title="Edit Plant"
          />
          <FaTrash
            className={styles.deleteIcon}
            onClick={() => plant.id !== undefined && handleDelete(plant.id)}
            title="Delete Plant"
          />
        </div>
      ),
    })),
    onSort: (field) => plantsStore.setSortField(field),
    sortField: plantsStore.sortField,
    sortOrder: plantsStore.sortOrder,
  };

  const buttonContainerData = {
    clickHandler: () => navigate('/addCropPage'),
    label: 'Add Crop',
  };

  const handleEdit = (id: number) => {
    navigate(`/addCropPage/${id}`);
  };

  const handleDelete = (id: number) => {
    plantsStore.deletePlant(id);
  };

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={plantsStore.isLoading}>
        <SearchBarContainer {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <Table {...tableProps} />
          <ButtonContainer {...buttonContainerData} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default CropsPage;
