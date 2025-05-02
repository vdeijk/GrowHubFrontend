import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import { LocationItem } from '../../api';

class FieldsData {
  public static tableHeaders: TableHeaderModel<LocationItem>[] = [
    { id: 'name', label: 'Title', sortable: true, type: 'string' },
    { id: 'actions', label: 'Actions', sortable: false, type: 'action' },
    { id: 'longitude', label: 'Longitude', sortable: true, type: 'number' },
    { id: 'latitude', label: 'Latitude', sortable: true, type: 'number' },
  ];

  public static textFields: Record<string, InputFieldModel> = {
    name: { key: 'name', label: 'Name', defaultValue: '' },
    longitude: { key: 'longitude', label: 'Longitude', defaultValue: '' },
    latitude: { key: 'latitude', label: 'Latitude', defaultValue: '' },
  };
}

export default FieldsData;
