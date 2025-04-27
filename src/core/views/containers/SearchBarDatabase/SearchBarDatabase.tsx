import React from 'react';
import styles from './SearchBarDatabase.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import SyncButton from '../../reusables/SyncButton/SyncButton';

export interface SearchBarDatabaseProps {
  searchQuery: InputField<string>;
  genusFilter: DropdownClass<string>;
  isLoading: boolean;
  handleSync: () => void;
}

const SearchBarDatabase: React.FC<SearchBarDatabaseProps> = observer(
  ({ searchQuery, genusFilter, isLoading, handleSync }) => {
    return (
      <div className={styles.container}>
        <TextInput
          label={searchQuery.label}
          value={searchQuery.value}
          onChange={searchQuery.setValue}
          placeholder={searchQuery.placeholder}
          aria-label="Search"
        />
        <Dropdown
          value={'Sun Preference'}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Sun Preference'}
          aria-label="Genus"
        />
        <Dropdown
          value={'Water Needs'}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Water Needs'}
          aria-label="Genus"
        />
        <Dropdown
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Soil Type'}
          aria-label="Genus"
        />
        <TextInput
          label={'Soil PH'}
          value={searchQuery.value}
          onChange={searchQuery.setValue}
          placeholder={searchQuery.placeholder}
          aria-label="Search"
        />
        <Dropdown
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Pruning'}
          aria-label="Genus"
        />
        <TextInput
          label={'Temperature Range'}
          value={searchQuery.value}
          onChange={searchQuery.setValue}
          placeholder={searchQuery.placeholder}
          aria-label="Search"
        />
        <Dropdown
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Plant Type'}
          aria-label="Genus"
        />
        <Dropdown
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Growth Rate'}
          aria-label="Genus"
        />
        <Dropdown
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={'Fertilizer Needs'}
          aria-label="Genus"
        />
        <SyncButton onClick={handleSync} isSyncing={isLoading} />
      </div>
    );
  },
);

export default SearchBarDatabase;
