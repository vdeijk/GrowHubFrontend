import * as React from 'react';
import SearchBar from '../../containers/SearchBar/SearchBar';
import Table from '../../reusables/TableWithSorting/TableWithSorting';
import styles from './PlantDatabase.module.css';
import Heading from '../../reusables/Heading/Heading';
import plantsStore from '../../../stores/PlantsStore/PlantsStore';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { SearchBarProps } from '../../containers/SearchBar/SearchBar';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import { Plant } from '../../../../auxiliary/interfaces/Plant';
import { toJS } from 'mobx';

const PlantDatabase: React.FC = observer(() => {
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
    data: plantsStore.filteredPlants,
    onSort: (field) => plantsStore.setSortField(field),
    sortField: plantsStore.sortField,
    sortOrder: plantsStore.sortOrder,
  };

  return (
    <section className={styles.section}>
      <Heading level={1} text="Plant Database" />
      <LoadingWrapper isLoading={plantsStore.isLoading}>
        <SearchBar {...searchBarProps} />
        <Table {...tableProps} />
      </LoadingWrapper>
    </section>
  );
});

export default PlantDatabase;
