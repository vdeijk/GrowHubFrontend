import React from 'react';
import SearchBarCrops from '../../containers/SearchBarCrops/SearchBarCrops';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './YourCropsPage.module.css';
import cropsStore from '../../../stores/CropsStore/YourCropsStore';
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

const YourCropsPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const searchBarProps: SearchBarProps = {
    searchQuery: cropsStore.searchQuery,
    genusFilter: cropsStore.dropdownFilters['genus'],
  };

  const handlePopup = (id: number | undefined) => {
    popupStore.openPopup(<PlantDatabasePopup />);
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addCropPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    cropsStore.deletePlant(id);
  };

  const tableProps: TableProps<Plant> = {
    headers: cropsStore.tableHeaders,
    data: cropsStore.filteredItems.map((item) => ({
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
      <Popup />
      <LoadingWrapper isLoading={cropsStore.isLoading}>
        <SearchBarCrops {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <TableWithSorting {...tableProps} />
          <ButtonContainer buttons={[buttonContainerData]} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default YourCropsPage;
