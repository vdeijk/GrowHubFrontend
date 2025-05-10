import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import Heading from '../../reusables/Heading/Heading';
import Button from '../../reusables/Button/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <Heading level={6} customStyles={{ marginBottom: '2rem' }}>
        404
      </Heading>
      <p className={styles.message}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Button label="Go to Dashboard" onClick={handleGoBack} />
    </div>
  );
};

export default NotFoundPage;
