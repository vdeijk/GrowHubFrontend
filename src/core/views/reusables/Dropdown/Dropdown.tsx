import React from 'react';
import styles from './Dropdown.module.css';
import { DropdownOption } from '../../../../auxiliary/interfaces/DropdownOptions';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.dropdown}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
