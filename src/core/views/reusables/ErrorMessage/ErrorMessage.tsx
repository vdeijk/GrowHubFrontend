import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  id?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, id }) => {
  return (
    <div id={id} role="alert" className={styles.error}>
      {message}
    </div>
  );
};

export default ErrorMessage;
