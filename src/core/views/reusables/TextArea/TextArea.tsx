import React from 'react';
import styles from './TextArea.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EventBus from '../../../services/EventBusService/EventBusService';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: string | null | undefined;
}

const TextArea: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  required = false,
  label,
  error,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id="textInput"
        required={required}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.textArea}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && <ErrorMessage id="error-message" message={error} />}
    </div>
  );
};

export default React.memo(TextArea);
