import React from 'react';
import styles from './DateInput.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EventBus from '../../../services/EventBusService/EventBusService';

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
  required = false,
  label,
  error,
}) => {
  const formattedValue =
    value && !isNaN(new Date(value).getTime())
      ? new Date(value).toISOString().split('T')[0]
      : '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);

    EventBus.dispatchEvent(`dateFilters:updated`, undefined);
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
        value={formattedValue}
        onChange={handleChange}
        className={styles.textInput}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && <ErrorMessage id="error-message" message={error} />}
    </div>
  );
};

export default React.memo(DateInput);
