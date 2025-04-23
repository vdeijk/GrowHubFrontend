import React from 'react';
import SearchBarCrops from '../../containers/SearchBarContainer/SearchBarCrops';
import Table from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './CropsDatabasePage.module.css';
import cropsStore from '../../../stores/CropsStore/CropsStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { SearchBarProps } from '../../containers/SearchBarContainer/SearchBarCrops';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { Plant } from '../../../../auxiliary/interfaces/Plant';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const CropsDatabasePage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    searchQuery: cropsStore.searchQuery,
    genusFilter: cropsStore.filterCriteria['genus'],
  };

  const tableProps: TableProps<Plant> = {
    headers: cropsStore.tableHeaders,
    data: cropsStore.filteredItems.map((item) => ({
      ...item,
      actions: (
        <div className={styles.actionIcons}>
          <FaEdit
            className={styles.editIcon}
            onClick={() => item.id !== undefined && handleEdit(item.id)}
            title="Edit Plant"
          />
          <FaTrash
            className={styles.deleteIcon}
            onClick={() => item.id !== undefined && handleDelete(item.id)}
            title="Delete Plant"
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

  const handleEdit = (id: number) => {
    navigate(`/addCropPage/${id}`);
  };

  const handleDelete = (id: number) => {
    cropsStore.deletePlant(id);
  };

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={cropsStore.isLoading}>
        <SearchBarCrops {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <Table {...tableProps} />
          <ButtonContainer {...buttonContainerData} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default CropsDatabasePage;
