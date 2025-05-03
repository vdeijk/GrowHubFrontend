import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
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

  public static textFields: Record<string, InputFieldModel> = {
    name: { key: 'name', label: 'Name', defaultValue: '' },
    longitude: { key: 'longitude', label: 'Longitude', defaultValue: '' },
    latitude: { key: 'latitude', label: 'Latitude', defaultValue: '' },
  };
}

export default FieldsData;
