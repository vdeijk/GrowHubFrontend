import React from 'react';
import styles from './MapSectionContainer.module.css';
import Map from '../../reusables/Map/Map';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { observer } from 'mobx-react-lite';
import locationStore from '../../../stores/FieldsStore/FieldsStore';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const MapSection: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/fieldsPage'),
    label: 'View All Fields',
  };

  const markers = locationStore.locations.map((location) => ({
    lat: location.latitude,
    lng: location.longitude,
    popupContent: location.name,
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
        <ButtonContainer buttons={[buttonContainerData]} />
      </LoadingWrapper>
    </section>
  );
});

export default MapSection;
