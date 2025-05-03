import React from 'react';
import styles from './SearchBar.module.css';
import TextInput from '../../reusables/TextInput/TextInput';
import DateInput from '../../reusables/DateInput/DateInput';
import { InputField } from '../../../../auxiliary/classes/InputField';
import { DateField } from '../../../../auxiliary/classes/DateField';
import { observer } from 'mobx-react-lite';
import Dropdown from '../../reusables/Dropdown/Dropdown';
import { DropdownField } from '../../../../auxiliary/classes/DropdownField';

export interface SearchBarProps {
  inputFields: InputField<string>[];
  dateFields: DateField<string>[];
  dropdownFields: DropdownField<string>[];
}

const SearchBar: React.FC<SearchBarProps> = observer(
  ({ inputFields, dateFields, dropdownFields }) => {
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
      <section className={styles.container}>
        {inputFields.length > 0 && inputFieldsDisplay}
        {dropdownFields.length > 0 && dropdownFieldsDisplay}
        {dateFields.length > 0 && dateFieldsDisplay}
      </section>
    );
  },
);

export default SearchBar;
