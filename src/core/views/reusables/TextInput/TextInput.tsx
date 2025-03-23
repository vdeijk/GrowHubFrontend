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
      {label && <label className={styles.label}>{label}</label>}
      <input
        required={required}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.textInput}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default TextInput;
