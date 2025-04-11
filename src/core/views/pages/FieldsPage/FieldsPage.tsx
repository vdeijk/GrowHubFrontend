import React from 'react';
import styles from './FieldsPage.module.css';
import Map from '../../reusables/Map/Map';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import FieldListContainer from '../../containers/FieldListContainer/FieldListContainer';
import fieldsStore from '../../../stores/FieldsStore/FieldsStore';
import { observer } from 'mobx-react-lite';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const FieldsPage: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/addFieldPage'),
    label: 'Add Field',
  };

  const handleEdit = (id: number) => {
    navigate(`/editField/${id}`);
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
        <div className={styles.top}></div>
        <div className={styles.left}>
          <Map {...mapData} />
        </div>
        <div className={styles.right}>
          <FieldListContainer {...listData} />
          <ButtonContainer {...buttonContainerData} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default FieldsPage;
