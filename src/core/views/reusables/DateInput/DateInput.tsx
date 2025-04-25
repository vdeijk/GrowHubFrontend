import React from 'react';
import styles from './DateInput.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export interface DateInputProps {
  value: string;
  onChange: (value: string | null) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: string | null | undefined;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder,
  required = false,
  label,
  error,
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue); 
  };

  return (
    <div className={label ? styles.container : ''}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <input
        id="textInput"
        required={required}
        type="date"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.textInput}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && <ErrorMessage id="error-message" message={error} />}
    </div>
  );
};

export default React.memo(DateInput);
