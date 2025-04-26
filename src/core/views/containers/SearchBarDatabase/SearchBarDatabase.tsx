import React from 'react';
import styles from './SearchBarDatabase.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';

export interface SearchBarProps {
  searchQuery: InputField<string>;
  genusFilter: DropdownClass<string>;
}

const SearchBarDatabase: React.FC<SearchBarProps> = observer(
  ({ searchQuery, genusFilter }) => {
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
          value={genusFilter.value}
          onChange={genusFilter.setValue}
          options={genusFilter.options}
          label={genusFilter.label}
          aria-label="Genus"
        />
      </div>
    );
  },
);

export default SearchBarDatabase;
