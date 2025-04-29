import React from 'react';
import styles from './Dropdown.module.css';
import { DropdownOption } from '../../../../auxiliary/interfaces/DropdownOptions';
import EventBus from '../../../services/EventTarget';

export interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  ariaLabel?: string;
  label?: string;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  ariaLabel,
  label,
  required,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(newValue);

    EventBus.dispatchEvent(`dropdownFilters:updated`, undefined);
  };

  return (
    <div className={label ? styles.container : ''}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <select
        required={required}
        value={value}
        onChange={handleChange}
        className={styles.dropdown}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
