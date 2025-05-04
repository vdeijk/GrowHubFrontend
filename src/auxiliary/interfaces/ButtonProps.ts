import React from 'react';

export interface ButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  customStyles?: React.CSSProperties;
}
