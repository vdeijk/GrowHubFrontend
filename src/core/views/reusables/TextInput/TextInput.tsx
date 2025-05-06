import React from 'react';
import styles from './TextInput.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EventBus from '../../../services/EventBusService/EventBusService';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: string | null | undefined;
  readonly?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  required = false,
  label,
  error,
  readonly,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);

    EventBus.dispatchEvent(`searchQuery:updated`, undefined);
  };

  return (
    <div className={label ? styles.container : ''}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
          {required && <span className={styles.requiredIndicator}>*</span>}
        </label>
      )}
      <input
        id="textInput"
        required={required}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.textInput}
        aria-invalid={!!error}
        readOnly={readonly}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && <ErrorMessage id="error-message" message={error} />}
    </div>
  );
};

export default React.memo(TextInput);
