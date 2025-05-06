import React from 'react';
import styles from './BatchesContainer.module.css';
import TableWithoutSorting from '../../reusables/TableWithoutSorting/TableWithoutSorting';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import plantsStore from '../../../stores/derived/BatchesStore/BatchesStore';
import Heading from '../../reusables/Heading/Heading';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { observer } from 'mobx-react-lite';
import { YourCropItem } from '../../../../api';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import { useTranslation } from 'react-i18next';

const BatchesContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();
  const { t } = useTranslation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => navigate('/batchesPage'),
      label: t('batches.viewAllBatches'),
    },
  ];

  const headersWithoutActions = plantsStore.tableHeaders
    .filter((header) => header.id !== 'actions')
    .map((header) => ({
      ...header,
      id: header.id as keyof YourCropItem,
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
        text={t('batches.heading')}
        customStyles={{ marginBottom: '2rem' }}
      />
      <TableWithoutSorting<YourCropItem>
        headers={headersWithoutActions}
        data={plantsStore.items.slice(0, 9).map((plant) => ({
          ...('actions' in plant ? omit(plant, 'actions') : plant),
        }))}
      />
      <ButtonContainer buttons={buttonContainerData} />
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

export default BatchesContainer;
