import React from 'react';
import SearchBarDatabase from '../../containers/SearchBarDatabase/SearchBarDatabase';
import Table from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './CropsDatabasePage.module.css';
import cropsDatabaseStore from '../../../stores/CropsDatabaseStore/CropsDatabaseStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { SearchBarProps } from '../../containers/SearchBarCrops/SearchBarCrops';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { Plant } from '../../../../auxiliary/interfaces/Plant';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import popupStore from '../../../stores/PopupStore/PopupStore';
import PlantDatabasePopup from '../../reusables/PlantDatabasePopup/PlantDatabasePopup';
import Popup from '../../containers/Popup/Popup';

const CropsDatabasePage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    searchQuery: cropsDatabaseStore.searchQuery,
    genusFilter: cropsDatabaseStore.dropdownFilters['genus'],
  };

  const handlePopup = (id: number | undefined) => {
    popupStore.openPopup(<PlantDatabasePopup />);
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
    data: cropsDatabaseStore.filteredItems.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
          item={item as { id: number | undefined }}
          handlePopup={handlePopup}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ),
    })),
    onSort: (field) => cropsDatabaseStore.setSortField(field),
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
          <Table {...tableProps} />
          <ButtonContainer buttons={[buttonContainerData]} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default CropsDatabasePage;
