import React from 'react';
import styles from './FieldsPage.module.css';
import Map from '../../reusables/Map/Map';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';
import fieldsStore from '../../../stores/derived/FieldsStore/FieldsStore';
import { observer } from 'mobx-react-lite';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import EventBus from '../../../services/EventBusService/EventBusService';
import TableWithSorting from '../../reusables/TableWithSorting/TableWithSorting';
import ActionIcons from '../../reusables/ActionIcons/ActionIcons';
import { LocationItem } from '../../../../api';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import { TableProps } from '../../reusables/TableWithSorting/TableWithSorting';
import FieldsData from '../../../../auxiliary/data/FieldsData';
import { useDeleteConfirmation } from '../../../../auxiliary/hooks/useDeleteConfirmation';
import Popup from '../../layouts/Popup/Popup';

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

  const { openDeleteConfirmation } = useDeleteConfirmation(
    fieldsStore.deleteField,
    'Are you sure you want to delete this field?',
  );

  const handleEdit = (id: number | undefined) => {
    if (id === undefined) return;

    navigate(`/addFieldPage/${id}`);
  };

  const handleDelete = (
    id: number | undefined,
    event: React.MouseEvent<SVGElement>,
  ) => {
    event.stopPropagation();
    console.log('delete');
    openDeleteConfirmation(id);
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

  const tableProps: TableProps<LocationItem> = {
    headers: FieldsData.tableHeaders as TableHeaderModel<LocationItem>[],
    data: fieldsStore.locations.map((item) => ({
      ...item,
      actions: (
        <ActionIcons
          item={item as { id: number | undefined }}
          handleDelete={handleDelete}
        />
      ),
    })),
    handleEdit,
  };

  return (
    <section className={styles.container}>
      <Popup />
      <LoadingWrapper isLoading={fieldsStore.isLoading}>
        <div className={styles.left}>
          <Map {...mapData} />
        </div>
        <div className={styles.right}>
          <TableWithSorting {...tableProps} />
          <ButtonContainer buttons={buttonContainerData} />
        </div>
      </LoadingWrapper>
    </section>
  );
});

export default FieldsPage;
