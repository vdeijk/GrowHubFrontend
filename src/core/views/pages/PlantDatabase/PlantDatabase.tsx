import React from 'react';
import styles from './PlantDatabase.module.css';
import Plants from '../../containers/Plants/Plants';
import Heading from '../../reusables/Heading/Heading';

const PlantDatabase: React.FC = () => {
  return (
    <section className={styles.section}>
      <Heading level={1} text="Plant Database" />
      <Plants />
    </section>
  );
};

export default PlantDatabase;
