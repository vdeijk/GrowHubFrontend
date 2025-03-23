import React from 'react';
import styles from './LoadingWrapper.module.css';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  children,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={`${styles.loadingWrapper} ${className}`}>
        <div className={styles.spinner}></div>
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
