import React from 'react';
import styles from './Plants.module.css';
import TableWithoutSorting from '../../reusables/TableWithoutSorting/TableWithoutSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import plantsStore from '../../../stores/PlantsStore';
import Heading from '../../reusables/Heading/Heading';

const Plants: React.FC = () => {
  const clickHandler = () => {};

  const buttonContainerData = {
    clickHandler,
    label: 'Go To Plant Database',
  };

  return (
    <section className={styles.plants}>
      <Heading level={6} text="Plant Information"></Heading>
      <TableWithoutSorting
        headers={plantsStore.tableHeaders}
        data={plantsStore.plants}
      />
      <ButtonContainer buttonContainerData={buttonContainerData} />
    </section>
  );
};

export default Plants;
