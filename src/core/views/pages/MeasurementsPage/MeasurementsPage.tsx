import React from 'react';
import styles from './Measurements.module.css';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import measurementsStore from '../../../stores/derived/MeasurementsStore/MeasurementsStore';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import Pagination from '../../reusables/Pagination/Pagination';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { ReadingItem } from '../../../../api';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import SearchBar from '../../containers/SearchBar/Searchbar';
import { SearchBarProps } from '../../containers/SearchBar/Searchbar';
import { observer } from 'mobx-react-lite';
import Popup from '../../layouts/Popup/Popup';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import { useDeleteConfirmation } from '../../../../auxiliary/hooks/useDeleteConfirmation';
import i18next from 'i18next';
import copyPasteStore from '../../../stores/derived/CopyPasteStore/CopyPasteStore';

interface MeasurementsProps {}

const MeasurementsPage: React.FC<MeasurementsProps> = observer(() => {
  const paginationService = measurementsStore.paginationService;
  const navigate = useRouterNavigation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => {
        navigate('/addMeasurementPage');
      },
      label: i18next.t('measurementsPage.buttons.addReading'),
    },
  ];

  const { openDeleteConfirmation } = useDeleteConfirmation(
    measurementsStore.deleteMeasurement,
    i18next.t('measurementsPage.deleteConfirmation.message'),
  );

  const handlePaste = (
    id: string | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    if (id === undefined) return;

    event.stopPropagation();

    copyPasteStore.pasteBatchIntoReading(id);
  };

  const handleEdit = (id: string | undefined) => {
    navigate(`/addMeasurementPage/${id}`);
  };

  const handleDelete = (
    id: string | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    event.stopPropagation();
    openDeleteConfirmation(id);
  };

  const searchBarProps: SearchBarProps = {
    inputFields: Object.values(measurementsStore.stringFilters).concat(
      Object.values(measurementsStore.numberFilters),
    ),
    dateFields: Object.values(measurementsStore.dateFilters),
    dropdownFields: Object.values(measurementsStore.dropdownFilters),
  };

  const tableProps: TableProps<ReadingItem> = {
    headers: measurementsStore.tableHeaders as TableHeaderModel<ReadingItem>[],
    data: measurementsStore.paginatedItems.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
          item={item as { id: string | undefined }}
          handleDelete={handleDelete}
          handlePaste={(
            id: string | undefined,
            event: React.MouseEvent<SVGElement>,
          ) => handlePaste(id, event)}
        />
      ),
    })),
    onSort: (field) => measurementsStore.sortItems(field as keyof ReadingItem),
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
