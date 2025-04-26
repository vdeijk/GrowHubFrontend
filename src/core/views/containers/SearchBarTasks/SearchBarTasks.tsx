import React from 'react';
import styles from './SearchBarTasks.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import { InputField } from '../../../../auxiliary/classes/InputFieldString';
import { DateField } from '../../../../auxiliary/classes/DateField';
import DateInput from '../../reusables/DateInput/DateInput';

export interface SearchBarTasksProps {
  searchQuery: InputField<string>;
  categoryFilter: DropdownClass<string>;
  priorityFilter: DropdownClass<string>;
  startDateFilter: DateField<string>;
  endDateFilter: DateField<string>;
}

const SearchBarTasks: React.FC<SearchBarTasksProps> = observer(
  ({
    searchQuery,
    priorityFilter,
    categoryFilter,
    startDateFilter,
    endDateFilter,
  }) => {
    return (
      <div className={styles.container}>
        <TextInput
          value={searchQuery.value}
          onChange={searchQuery.setValue}
          placeholder={searchQuery.placeholder}
          label={searchQuery.label}
          aria-label="Title"
        />
        <DateInput
          label={startDateFilter.label}
          value={startDateFilter?.value || ''}
          onChange={(date) => startDateFilter?.setValue(date || '')}
          aria-label="Start Date"
        />
        <DateInput
          label={endDateFilter.label}
          value={endDateFilter?.value || ''}
          onChange={(date) => endDateFilter?.setValue(date || '')}
          aria-label="End Date"
        />
        <Dropdown
          value={priorityFilter.value}
          onChange={priorityFilter.setValue}
          options={priorityFilter.options}
          aria-label="Priority"
          label="Priority"
        />
        <Dropdown
          value={categoryFilter.value}
          onChange={categoryFilter.setValue}
          options={categoryFilter.options}
          aria-label="Category"
          label="Category"
        />
      </div>
    );
  },
);

export default SearchBarTasks;
