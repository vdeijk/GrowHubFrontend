import React from 'react';
import styles from './FieldsPage.module.css';
import Map from '../../reusables/Map/Map';
import ButtonContainer, {
  ButtonConfig,
} from '../../reusables/ButtonContainer/ButtonContainer';
import FieldListContainer from '../../containers/FieldListContainer/FieldListContainer';
import fieldsStore from '../../../stores/FieldsStore/FieldsStore';
import { observer } from 'mobx-react-lite';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import EventBus from '../../../services/EventBusService/EventBusService';

const FieldsPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonConfigs: ButtonConfig[] = [
    {
      clickHandler: () => EventBus.dispatchEvent('centerMap', undefined),
      label: 'Center Map',
    },
    {
      clickHandler: () => navigate('/addFieldPage'),
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

  const markers = fieldsStore.locations.map((location) => ({
    lat: location.latitude,
    lng: location.longitude,
    popupContent: location.name,
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
          <ButtonContainer buttons={buttonConfigs} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default FieldsPage;
