import React from 'react';
import styles from './Plants.module.css';
import Table from '../../reusables/Table/Table';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import plantsStore from '../../../stores/PlantsStore';
import Heading from '../../reusables/Heading/Heading';

const Plants: React.FC = () => {
  const clickHandler = () => {};

  const buttonContainerData = {
    clickHandler,
    label: 'Go To Plant Database',
  };

  const headers = [
    'Name',
    'Sun Preference',
    'Water Needs',
    'Soil Type',
    'Soil PH',
    'Mature Size',
    'Bloom Time',
    'Fertilizer Needs',
  ];

  return (
    <section className={styles.plants}>
      <Heading level={6} text="Plant Information"></Heading>
      <Table headers={headers} data={plantsStore.plants} />
      <ButtonContainer buttonContainerData={buttonContainerData} />
    </section>
  );
};

export default Plants;

