import React from 'react';
import styles from './CheckboxInput.module.css';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={label ? styles.container : ''}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={styles.checkboxInput}
      />
    </div>
  );
};

export default CheckboxInput;
