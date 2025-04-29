import React from 'react';
import styles from './CropsDatabaseContainer.module.css';
import TableWithoutSorting from '../../reusables/TableWithoutSorting/TableWithoutSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import cropsDatabaseStore from '../../../stores/derived/CropsDatabaseStore/CropsDatabaseStore';
import Heading from '../../reusables/Heading/Heading';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { observer } from 'mobx-react-lite';
import { Plant } from '../../../../auxiliary/interfaces/Plant';

const CropsDatabaseContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/cropsDatabase'),
    label: 'View All Crops',
  };

  const headersWithoutActions = cropsDatabaseStore.tableHeaders
    .filter((header) => header.id !== 'actions')
    .map((header) => ({
      ...header,
      id: header.id as keyof Plant,
    }));

  const omit = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
    const rest = { ...obj };
    delete rest[key];
    return rest;
  };

  const children = (
    <>
      <Heading
        level={6}
        text="Crop Database"
        customStyles={{ marginBottom: '2rem' }}
      />
      <TableWithoutSorting<Plant>
        headers={headersWithoutActions}
        data={cropsDatabaseStore.items.slice(0, 9).map((plant, index) => ({
          ...omit(plant, 'actions'),
          index,
        }))}
      />
      <ButtonContainer buttons={[buttonContainerData]} />
    </>
  );

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={cropsDatabaseStore.isLoading}>
        {children}
      </LoadingWrapper>
    </section>
  );
});

export default CropsDatabaseContainer;
