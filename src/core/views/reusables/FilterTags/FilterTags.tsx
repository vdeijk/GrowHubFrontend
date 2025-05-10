import React from 'react';
import styles from './FilterTags.module.css';
import { observer } from 'mobx-react-lite';
import FilterTag from '../FilterTag/FilterTag';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface FilterTagsProps {
  activeFiltersCount: number;
  inputFields: InputField<string>[];
  dateFields: DateField<string>[];
  dropdownFields: DropdownField<string>[];
  clearFilter: (
    field: InputField<string> | DateField<string> | DropdownField<string>,
  ) => void;
  clearAllFilters: () => void;
  formatDate: (dateString: string) => string;
  isAnimatingLastTag: boolean;
}

const FilterTags: React.FC<FilterTagsProps> = observer((props) => {
  const {
    activeFiltersCount,
    inputFields,
    dateFields,
    dropdownFields,
    clearFilter,
    clearAllFilters,
    formatDate,
  } = props;

  return (
    <div className={styles.filterTagsContainer}>
      {activeFiltersCount === 0 ? (
        <span className={styles.emptyTagsMessage}>No active filters</span>
      ) : (
        <>
          {inputFields
            .filter((field) => field.value !== '')
            .map((field, index) => (
              <FilterTag
                key={`tag-text-${index}`}
                label={`${field.label}: ${field.value}`}
                type="text"
                onRemove={() => clearFilter(field)}
              />
            ))}

          {dropdownFields
            .filter((field) => field.value !== '')
            .map((field, index) => {
              const selectedOption = field.options.find(
                (opt) => opt.value === field.value,
              );
              return (
                <FilterTag
                  key={`tag-dropdown-${index}`}
                  label={`${field.label}: ${selectedOption?.label || field.value}`}
                  type="dropdown"
                  onRemove={() => clearFilter(field)}
                />
              );
            })}

          {dateFields
            .filter((field) => field.value !== '')
            .map((field, index) => (
              <FilterTag
                key={`tag-date-${index}`}
                label={`${field.label}: ${formatDate(field.value)}`}
                type="date"
                onRemove={() => clearFilter(field)}
              />
            ))}

          {activeFiltersCount > 1 && (
            <button
              className={styles.clearAllButton}
              onClick={clearAllFilters}
              aria-label="Clear all filters"
            >
              Clear all <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </>
      )}
    </div>
  );
});

export default FilterTags;
