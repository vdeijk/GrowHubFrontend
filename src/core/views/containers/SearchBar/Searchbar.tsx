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
    return (
      <div className={styles.container}>
        {inputFields.map((field, index) => (
          <TextInput
            key={`input-${index}`}
            label={field.label}
            value={field.value}
            onChange={field.setValue}
            placeholder={field.placeholder}
            aria-label={field.label}
          />
        ))}
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
  },
);

export default SearchBar;
