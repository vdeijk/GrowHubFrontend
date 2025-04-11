import React from 'react';
import styles from './CropsContainer.module.css';
import TableWithoutSorting from '../../reusables/TableWithoutSorting/TableWithoutSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import plantsStore from '../../../stores/CropsStore/CropsStore';
import Heading from '../../reusables/Heading/Heading';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import { PlantWithIndex } from '../../../../auxiliary/interfaces/PlantWithIndex';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { observer } from 'mobx-react-lite';

const Plants: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/cropsPage'),
    label: 'View All Crops',
  };

  const headersWithoutActions = plantsStore.tableHeaders.filter(
    (header) => header.id !== 'actions',
  );

  const omit = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
    const rest = { ...obj };
    delete rest[key];
    return rest;
  };

  const children = (
    <>
      <Heading level={6} text="Your Crops" />
      <TableWithoutSorting<PlantWithIndex>
        headers={headersWithoutActions}
        data={plantsStore.plants.map((plant, index) => ({
          ...omit(plant, 'actions'),
          index,
        }))}
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
});

export default Plants;
