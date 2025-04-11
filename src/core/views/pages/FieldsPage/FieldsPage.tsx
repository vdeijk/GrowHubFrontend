import React from 'react';
import styles from './FieldsPage.module.css';
import Map from '../../reusables/Map/Map';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import FieldListContainer from '../../containers/FieldListContainer/FieldListContainer';
import fieldsStore from '../../../stores/FieldsStore/FieldsStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const FieldsPage: React.FC = observer(() => {
  const navigate = useNavigate();

  const buttonContainerData = {
    clickHandler: () => navigate('/addFieldPage'),
    label: 'Add Field',
  };

  const handleEdit = (id: number) => {
    console.log(`Edit location with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete location with id: ${id}`);
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
    <div className={styles.container}>
      <div className={styles.top}>
        <Heading level={1} text="Farm Fields" />
      </div>
      <div className={styles.left}>
        <Map {...mapData} />
      </div>
      <div className={styles.right}>
        <FieldListContainer {...listData} />
        <ButtonContainer {...buttonContainerData} />
      </div>
    </div>
  );
});

export default FieldsPage;
