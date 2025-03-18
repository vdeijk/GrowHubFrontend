import React from 'react';
import styles from './SearchBar.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { DropdownOption } from '../../../../auxiliary/interfaces/DropdownOptions';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCriteria: string;
  setFilterCriteria: (criteria: string) => void;
  sunPreferenceOptions: DropdownOption[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  filterCriteria,
  setFilterCriteria,
  sunPreferenceOptions,
}) => {

  return (
    <div className={styles.searchBar}>
      <TextInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search plants..."
      />
      <Dropdown
        value={filterCriteria}
        onChange={setFilterCriteria}
        options={sunPreferenceOptions}
      />
    </div>
  );
};

export default SearchBar;
