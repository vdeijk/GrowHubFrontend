import React from 'react';
import styles from './FieldsPage.module.css';
import Map from '../../reusables/Map/Map';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import FieldListContainer from '../../containers/FieldListContainer/FieldListContainer';
import fieldsStore from '../../../stores/derived/FieldsStore/FieldsStore';
import { observer } from 'mobx-react-lite';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import EventBus from '../../../services/EventBusService/EventBusService';

const FieldsPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => EventBus.dispatchEvent('centerMap', undefined),
      label: 'Center Map',
    },
    {
      onClick: () => navigate('/addFieldPage'),
      label: 'Add Field',
    },
  ];

  const handleEdit = (id: number) => {
    navigate(`/addFieldPage/${id}`);
  };

  const handleDelete = (id: number) => {
    fieldsStore.deleteField(id);
  };

  const listData = {
    locations: fieldsStore.locations,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  const markers = fieldsStore.locations
    .filter(
      (location) =>
        location.latitude !== undefined &&
        location.longitude !== undefined &&
        location.name !== null &&
        location.name !== undefined,
    )
    .map((location) => ({
      lat: location.latitude as number,
      lng: location.longitude as number,
      popupContent: location.name as string,
    }));

  const mapData = {
    enableScroll: true,
    markers,
  };

  return (
    <section className={styles.container}>
      <LoadingWrapper isLoading={fieldsStore.isLoading}>
        <div className={styles.left}>
          <Map {...mapData} />
        </div>
        <div className={styles.right}>
          <FieldListContainer {...listData} />
          <ButtonContainer buttons={buttonContainerData} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default FieldsPage;
