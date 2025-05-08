import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import DateInput from '../../reusables/DateInput/DateInput';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { observer } from 'mobx-react-lite';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';
import Divider from '../../reusables/Divider/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

export interface SearchBarProps {
  inputFields: InputField<string>[];
  dateFields: DateField<string>[];
  dropdownFields: DropdownField<string>[];
}

const SearchBar: React.FC<SearchBarProps> = observer(
  ({ inputFields, dateFields, dropdownFields }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const activeFiltersCount = [
      ...inputFields.filter((field) => field.value !== ''),
      ...dateFields.filter((field) => field.value !== ''),
      ...dropdownFields.filter((field) => field.value !== ''),
    ].length;

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    const inputFieldsDisplay = (
      <div className={styles.subContainer}>
        {inputFields
          .filter((field) => field.label.toLowerCase() !== 'notes')
          .map((field, index) => (
            <TextInput
              key={`input-${index}`}
              label={field.label}
              value={field.value}
              onChange={field.setValue}
              placeholder={field.placeholder}
              aria-label={field.label}
            />
          ))}
      </div>
    );

    const dateFieldsDisplay = (
      <div className={styles.subContainer}>
        {dateFields.map((field, index) => (
          <DateInput
            key={`date-${index}`}
            value={field.value}
            onChange={(date) => field.setValue(date || '')}
            label={field.label}
            aria-label={field.label}
          />
        ))}
      </div>
    );

    const dropdownFieldsDisplay = (
      <div className={styles.subContainer}>
        {dropdownFields.map((field, index) => (
          <Dropdown
            key={`dropdown-${index}`}
            value={field.value}
            onChange={(value) => field.setValue(String(value))}
            options={field.options}
            aria-label={field.label}
            label={field.label}
          />
        ))}
      </div>
    );

    return (
      <section
        className={`${styles.container} ${!isExpanded ? styles.collapsed : ''}`}
      >
        <div className={styles.searchHeader}>
          <div className={styles.searchTitle}>
            <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
            <h3>
              Filters{' '}
              {activeFiltersCount > 0 && (
                <span className={styles.filterCount}>
                  ({activeFiltersCount})
                </span>
              )}
            </h3>
          </div>
          <button
            className={styles.collapseButton}
            onClick={toggleExpand}
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
            title={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </button>
        </div>

        <div className={styles.searchContent}>
          {inputFields.length > 0 && inputFieldsDisplay}
          {inputFields.length > 0 &&
            (dropdownFields.length > 0 || dateFields.length > 0) && <Divider />}
          {dropdownFields.length > 0 && dropdownFieldsDisplay}
          {dropdownFields.length > 0 && <Divider />}
          {dateFields.length > 0 && dateFieldsDisplay}
        </div>
      </section>
    );
  },
);

export default SearchBar;
