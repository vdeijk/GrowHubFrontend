import React from 'react';
import styles from './TextInput.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  error?: string | null | undefined;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  required = false,
  label,
  error,
}) => {
  return (
    <div className={label ? styles.container : ''}>
      {label && (
        <label className={styles.label} htmlFor="textInput">
          {label}
        </label>
      )}
      <input
        id="textInput"
        required={required}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.textInput}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && <ErrorMessage id="error-message" message={error} />}
    </div>
  );
};

export default React.memo(TextInput);
