import React from 'react';
import styles from './Plants.module.css';
import TableWithoutSorting from '../../reusables/TableWithoutSorting/TableWithoutSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import plantsStore from '../../../stores/PlantsStore';
import Heading from '../../reusables/Heading/Heading';
import { useNavigate } from 'react-router-dom';

const Plants: React.FC = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/plantDatabase');
  };

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
      <ButtonContainer {...buttonContainerData} />
    </section>
  );
};

export default Plants;
