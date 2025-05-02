import React from 'react';
import styles from './SearchBarTasks.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { Dropdown as DropdownClass } from '../../../../auxiliary/classes/Dropdown';
import { observer } from 'mobx-react-lite';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import DateInput from '../../reusables/DateInput/DateInput';

export interface SearchBarTasksProps {
  searchQuery: InputField<string>;
  categoryFilter: DropdownClass<string>;
  priorityFilter: DropdownClass<string>;
  startDateFilter: DateField<string>;
  endDateFilter: DateField<string>;
  statusFilter: DropdownClass<string>;
}

const SearchBarTasks: React.FC<SearchBarTasksProps> = observer(
  ({
    searchQuery,
    priorityFilter,
    categoryFilter,
    startDateFilter,
    endDateFilter,
    statusFilter,
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
        <div></div>
        <div></div>
        <div></div>
        <Dropdown
          value={priorityFilter.value}
          onChange={(value) => priorityFilter.setValue(String(value))}
          options={priorityFilter.options}
          aria-label="Priority"
          label="Priority"
        />
        <Dropdown
          value={categoryFilter.value}
          onChange={(value) => categoryFilter.setValue(String(value))}
          options={categoryFilter.options}
          aria-label="Category"
          label="Category"
        />
        <Dropdown
          value={statusFilter.value}
          onChange={(value) => statusFilter.setValue(String(value))}
          options={statusFilter.options}
          aria-label="Status"
          label={statusFilter.label}
        />{' '}
        <div></div>
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
      </div>
    );
  },
);

export default SearchBarTasks;
