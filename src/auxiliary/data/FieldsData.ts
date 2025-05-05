import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { LocationItem } from '../../api';

class FieldsData {
  public static tableHeaders: TableHeaderModel<LocationItem>[] = [
    {
      id: 'name',
      label: 'Title',
      sortable: true,
      type: 'string',
      tooltip: 'test',
    },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
      type: 'action',
      tooltip: 'test',
    },
    {
      id: 'longitude',
      label: 'Longitude',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'latitude',
      label: 'Latitude',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
  ];
}

export default FieldsData;
