import React from 'react';
import styles from './PlantDatabase.module.css';
import Heading from '../../reusables/Heading/Heading';
import Table from '../../reusables/Table/Table';
import SearchBar from '../../containers/SearchBar/SearchBar';
import plantsStore from '../../../stores/PlantsStore';
import { observer } from 'mobx-react-lite';

const PlantDatabase: React.FC = observer(() => {
  const searchBarProps = {
    searchQuery: plantsStore.searchQuery,
    setSearchQuery: plantsStore.setSearchQuery,
    filterCriteria: plantsStore.filterCriteria,
    setFilterCriteria: plantsStore.setFilterCriteria,
    sunPreferenceOptions: plantsStore.sunPreferenceOptions
  };

  return (
    <section className={styles.section}>
      <Heading level={1} text="Plant Database" />
      <SearchBar {...searchBarProps} />
      <Table headers={plantsStore.tableHeaders} data={plantsStore.filteredPlants} />
    </section>
  );
});

export default PlantDatabase;
