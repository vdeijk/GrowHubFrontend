import React from 'react';
import styles from './SearchBarTasks.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { DropdownOption } from '../../../../auxiliary/interfaces/DropdownOptions';
//import DateInput from '../../reusables/DateInput/DateInput';
import { Category } from '../../../../auxiliary/enums/Category';
import { Priority } from '../../../../auxiliary/enums/Priority';

export interface SearchBarTasksProps {
  searchQuery: string;
  error: string | null | undefined;
  setSearchQuery: (query: string) => void;
  filterCriteria: {
    category: Category | null;
    priority: Priority | null;
  };
  setFilterCriteria: (
    type: 'category' | 'priority',
    value: Category | Priority | null,
  ) => void;
  categoryOptions: DropdownOption[];
  priorityOptions: DropdownOption[];
}

const SearchBarTasks: React.FC<SearchBarTasksProps> = ({
  searchQuery,
  setSearchQuery,
  filterCriteria,
  setFilterCriteria,
  categoryOptions,
  priorityOptions,
  error,
}) => {
  return (
    <div className={styles.container}>
      <TextInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search tasks..."
        error={error}
      />
      <Dropdown
        value={filterCriteria.priority || ''}
        onChange={(value) =>
          setFilterCriteria('priority', value ? (value as Priority) : null)
        }
        options={priorityOptions}
        aria-label="Filter by Priority"
      />
      <Dropdown
        value={filterCriteria.category || ''}
        onChange={(value) =>
          setFilterCriteria('category', value ? (value as Category) : null)
        }
        options={categoryOptions}
        aria-label="Filter by Category"
      />
      {/* <DateInput
        value={filterCriteria}
        onChange={setFilterCriteria}
        aria-label="Filter by Category"
      /> */}
    </div>
  );
};

export default SearchBarTasks;
