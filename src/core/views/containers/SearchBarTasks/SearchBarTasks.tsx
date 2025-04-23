import React from 'react';
import styles from './SearchBarTasks.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
//import DateInput from '../../reusables/DateInput/DateInput';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import { InputField } from '../../../../auxiliary/classes/InputField';

export interface SearchBarTasksProps {
  searchQuery: InputField<string>;
  categoryFilter: DropdownClass<string>;
  priorityFilter: DropdownClass<string>;
}

const SearchBarTasks: React.FC<SearchBarTasksProps> = observer(
  ({ searchQuery, priorityFilter, categoryFilter }) => {
    return (
      <div className={styles.container}>
        <TextInput
          value={searchQuery.value}
          onChange={searchQuery.setValue}
          placeholder={searchQuery.placeholder}
          label={searchQuery.label}
          aria-label="Search by Title"
        />
        <Dropdown
          value={priorityFilter.value}
          onChange={priorityFilter.setValue}
          options={priorityFilter.options}
          aria-label="Filter by Priority"
          label="Filter by Priority"
        />
        <Dropdown
          value={categoryFilter.value}
          onChange={categoryFilter.setValue}
          options={categoryFilter.options}
          aria-label="Filter by Category"
          label="Filter by Category"
        />
      </div>
    );
  },
);

export default SearchBarTasks;

{
  /* <DateInput
        value={filterCriteria}
        onChange={setFilterCriteria}
        aria-label="Filter by Category"
      /> */
}
