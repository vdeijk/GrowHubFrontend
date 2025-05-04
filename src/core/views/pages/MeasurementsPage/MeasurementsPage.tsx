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
import SearchBar from '../../containers/SearchBar/Searchbar';
import { SearchBarProps } from '../../containers/SearchBar/Searchbar';
import { observer } from 'mobx-react-lite';
import Popup from '../../layouts/Popup/Popup';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';

interface MeasurementsProps {}

const MeasurementsPage: React.FC<MeasurementsProps> = observer(() => {
  const paginationService = measurementsStore.paginationService;
  const navigate = useRouterNavigation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => {
        console.log('Add Reading');
        navigate('/addMeasurementPage');
      },
      label: 'Add Reading',
    },
  ];

  const handleEdit = (id: number | undefined) => {
    navigate(`/addMeasurementPage/${id}`);
  };

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return;

    measurementsStore.deleteMeasurement(id);
  };

  const searchBarProps: SearchBarProps = {
    inputFields: Object.values(measurementsStore.textFilters),
    dateFields: Object.values(measurementsStore.dateFilters),
    dropdownFields: Object.values(measurementsStore.dropdownFilters),
  };

  const tableProps: TableProps<MeasurementItem> = {
    headers:
      measurementsStore.tableHeaders as TableHeaderModel<MeasurementItem>[],
    data: measurementsStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
          item={item as { id: number | undefined }}
          handleDelete={handleDelete}
          handlePaste={(id) => console.log('Paste', id)}
        />
      ),
    })),
    onSort: (field) =>
      measurementsStore.sortItems(field as keyof MeasurementItem),
    sortField: measurementsStore.sortField,
    sortOrder: measurementsStore.sortOrder,
    handleEdit,
  };

  return (
    <section className={styles.section}>
      <Popup />
      <LoadingWrapper isLoading={measurementsStore.isLoading}>
        <SearchBar {...searchBarProps} />
        <div className={styles.buttonContainer}>
          <div className={styles.tableContainer}>
            <TableWithSorting {...tableProps} />
          </div>
          <ButtonContainer buttons={buttonContainerData} />
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
