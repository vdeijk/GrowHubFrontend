import React from 'react';
import styles from './LoadingWrapper.module.css';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
