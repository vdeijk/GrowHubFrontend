import React from 'react';
import styles from './SearchBar.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { DropdownOption } from '../../../../auxiliary/interfaces/DropdownOptions';

export interface SearchBarProps {
  searchQuery: string;
  error: string | null | undefined;
  setSearchQuery: (query: string) => void;
  filterCriteria: string;
  setFilterCriteria: (criteria: string) => void;
  genusOptions: DropdownOption[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  filterCriteria,
  setFilterCriteria,
  genusOptions,
  error,
}) => {
  return (
    <div className={styles.searchBar}>
      <TextInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search plants..."
        error={error}
      />
      <Dropdown
        value={filterCriteria}
        onChange={setFilterCriteria}
        options={genusOptions}
      />
    </div>
  );
};

export default SearchBar;
