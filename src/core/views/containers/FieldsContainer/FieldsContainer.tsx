import React from 'react';
import styles from './FieldsContainer.module.css';
import Map from '../../reusables/Map/Map';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { observer } from 'mobx-react-lite';
import locationStore from '../../../stores/derived/FieldsStore/FieldsStore';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import { useTranslation } from 'react-i18next';

const FieldsContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();
  const { t } = useTranslation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => navigate('/fieldsPage'),
      label: t('fields.viewAllFields'),
    },
  ];

  const markers = locationStore.locations
    .filter(
      (location) =>
        location.latitude !== undefined &&
        location.longitude !== undefined &&
        location.name !== null,
    )
    .map((location) => ({
      lat: location.latitude!,
      lng: location.longitude!,
      popupContent: location.name!,
    }));

  const mapData = {
    enableScroll: false,
    markers,
  };

  return (
    <section className={styles.container}>
      <LoadingWrapper isLoading={locationStore.isLoading}>
        <Heading
          level={6}
          text={t('fields.heading')}
          customStyles={{ marginBottom: '2rem' }}
        />
        <Map {...mapData} />
        <ButtonContainer buttons={buttonContainerData} />
      </LoadingWrapper>
    </section>
  );
});

export default FieldsContainer;
