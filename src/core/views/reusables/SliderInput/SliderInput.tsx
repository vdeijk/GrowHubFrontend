import React from 'react';
import styles from './SliderInput.module.css';

interface SliderInputProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  required?: boolean;
  onChange: (value: [number, number]) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({
  min = 0,
  max = 14,
  step = 0.1,
  label,
  value,
  required,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newMax: number = Math.max(Number(e.target.value), value + step);
    onChange([value, newMax]);
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
        id={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={styles.sliderInput}
      />
    </div>
  );
};

export default SliderInput;
