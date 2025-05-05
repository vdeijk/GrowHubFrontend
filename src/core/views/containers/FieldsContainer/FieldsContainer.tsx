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

const FieldsContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => navigate('/fieldsPage'),
      label: 'View All Fields',
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
          text="Your Fields"
          customStyles={{ marginBottom: '2rem' }}
        />
        <Map {...mapData} />
        <ButtonContainer buttons={buttonContainerData} />
      </LoadingWrapper>
    </section>
  );
});

export default FieldsContainer;
