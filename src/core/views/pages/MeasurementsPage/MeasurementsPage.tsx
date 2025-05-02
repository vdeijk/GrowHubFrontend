import React from 'react';
import styles from './Measurements.module.css';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import measurementsStore from '../../../stores/derived/MeasurementsStore/MeasurementsStore';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import Pagination from '../../reusables/Pagination/Pagination';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { MeasurementItem } from '../../../../api';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import SearchBarMeasurements from '../../containers/SearchBarMeasurements/SearchBarMeasurements';
import { SearchBarMeasurementsProps } from '../../containers/SearchBarMeasurements/SearchBarMeasurements';
import { observer } from 'mobx-react-lite';
import popupService from '../../../services/PopupService/PopupService';
import NotesPopup from '../../reusables/NotesPopup/NotesPopup';
import Popup from '../../containers/Popup/Popup';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';

interface MeasurementsProps {}

const MeasurementsPage: React.FC<MeasurementsProps> = observer(() => {
  const paginationService = measurementsStore.paginationService;
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/addMeasurement'),
    label: 'Add Measurement',
  };

  const handlePopup = (id: number | undefined) => {
    if (id === undefined) return;

    const task = measurementsStore.items.find((item) => item.id === id);
    if (!task) return;

    measurementsStore.textFilters.description.setValue(task.notes ?? '');

    popupService.openPopup(
      <NotesPopup
        description={measurementsStore.textFilters.description}
        title={'Measurement Notes'}
      />,
    );
  };

  const handleEdit = (id: number | undefined) => {
    navigate(`/addMeasurement/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    measurementsStore.deleteMeasurement(id);
  };

  const searchBarProps: SearchBarMeasurementsProps = {
    searchQuery: measurementsStore.textFilters.searchQuery,
    soilDryness: measurementsStore.dropdownFilters['soilDryness'],
    lightLevel: measurementsStore.dropdownFilters['lightLevel'],
    phMin: measurementsStore.textFilters['phMin'],
    phMax: measurementsStore.textFilters['phMax'],
    healthStatus: measurementsStore.dropdownFilters['healthStatus'],
    growthStage: measurementsStore.dropdownFilters['growthStage'],
    dateMax: measurementsStore.dateFilters['dateMax'],
    dateMin: measurementsStore.dateFilters['dateMin'],
  };

  const tableProps: TableProps<MeasurementItem> = {
    headers: measurementsStore.tableHeaders as TableHeaderModel<MeasurementItem>[],
    data: measurementsStore.paginatedItems.map((item) => ({
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
    onSort: (field) =>
      measurementsStore.sortItems(field as keyof MeasurementItem),
    sortField: measurementsStore.sortField,
    sortOrder: measurementsStore.sortOrder,
  };

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={measurementsStore.isLoading}>
        <SearchBarMeasurements {...searchBarProps} />
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

export default MeasurementsPage;
