import fieldsStore from '../../core/stores/derived/FieldsStore/FieldsStore';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import { YourCropItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class YourCropsData {
  public static tableHeaders: TableHeaderModel<YourCropItem>[] = [
    { id: 'id', label: 'Id', sortable: true, type: 'number' },
    { id: 'commonName', label: 'Common Name', sortable: true, type: 'string' },
    { id: 'actions', label: 'Actions', sortable: false, type: 'action' },
    { id: 'databaseId', label: 'Database Id', sortable: true, type: 'number' },
    { id: 'amount', label: 'Amount', sortable: true, type: 'number' },
    { id: 'location', label: 'Location', sortable: true, type: 'string' },
    { id: 'lastWatered', label: 'Last Watered', sortable: true, type: 'date' },
    {
      id: 'lastFertilized',
      label: 'Last Fertilized',
      sortable: true,
      type: 'date',
    },
    { id: 'lastPruned', label: 'Last Pruned', sortable: true, type: 'date' },
    {
      id: 'lastHarvested',
      label: 'Last Harvested',
      sortable: true,
      type: 'date',
    },
  ];

  public static textFields: Record<string, InputFieldModel> = {
    searchQuery: { key: 'searchQuery', label: 'Search', defaultValue: '' },
    descriptionField: {
      key: 'description',
      label: 'Description',
      defaultValue: '',
    },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    location: {
      key: 'location',
      label: 'Location',
      options: [],
      defaultValue: '',
    },
  };

  public static updateLocationDropdownOptions() {
    this.dropdowns['location'].options = fieldsStore
      .getLocations()
      .map((field) => ({
        value: field.name ?? '',
        label: field.name ?? '',
      }));
  }

  public static dateFields: DateFieldModel[] = [
    { key: 'lastWatered', label: 'Last Watered', defaultValue: '' },
    { key: 'lastFertilized', label: 'Last Fertilized', defaultValue: '' },
    { key: 'lastPruned', label: 'Last Pruned', defaultValue: '' },
    { key: 'lastHarvested', label: 'Last Harvested', defaultValue: '' },
  ];
}

export default YourCropsData;
