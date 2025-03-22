import React from 'react';
import styles from './Plants.module.css';
import TableWithoutSorting from '../../reusables/TableWithoutSorting/TableWithoutSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import plantsStore from '../../../stores/PlantsStore';
import Heading from '../../reusables/Heading/Heading';
import { useNavigate } from 'react-router-dom';
import { PlantWithIndex } from '../../../../auxiliary/interfaces/PlantWithIndex';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const Plants: React.FC = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/plantDatabase');
  };

  const buttonContainerData = {
    clickHandler,
    label: 'Go To Plant Database',
  };

  const children = (
    <>
      <Heading level={6} text="Plant Information"></Heading>
      <TableWithoutSorting<PlantWithIndex>
        headers={plantsStore.tableHeaders}
        data={plantsStore.plants.map((plant, index) => ({ ...plant, index }))}
      />
      <ButtonContainer {...buttonContainerData} />
    </>
  );

  return (
    <section className={styles.plants}>
      <LoadingWrapper isLoading={plantsStore.isLoading}>
        {children}
      </LoadingWrapper>
    </section>
  );
};

export default Plants;
