import React from 'react';
import styles from './YourCropsContainer.module.css';
import TableWithoutSorting from '../../reusables/TableWithoutSorting/TableWithoutSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import plantsStore from '../../../stores/YourCropsStore/YourCropsStore';
import Heading from '../../reusables/Heading/Heading';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { observer } from 'mobx-react-lite';
import { Plant } from '../../../../auxiliary/interfaces/Plant';

const YourCropsContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/cropsDatabase'),
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
      <Heading
        level={6}
        text="Your Crops"
        customStyles={{ marginBottom: '2rem' }}
      />
      <TableWithoutSorting<Plant>
        headers={headersWithoutActions}
        data={plantsStore.items.slice(0, 9).map((plant, index) => ({
          ...omit(plant, 'actions'),
          index,
        }))}
      />
      <ButtonContainer buttons={[buttonContainerData]} />
    </>
  );

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={plantsStore.isLoading}>
        {children}
      </LoadingWrapper>
    </section>
  );
});

export default YourCropsContainer;
