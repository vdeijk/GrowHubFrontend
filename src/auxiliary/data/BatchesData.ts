import fieldsStore from '../../core/stores/derived/FieldsStore/FieldsStore';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import { YourCropItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class BatchesData {
  public static tableHeaders: TableHeaderModel<YourCropItem>[] = [
    { id: 'id', label: 'Id', sortable: true, type: 'number' },
    { id: 'commonName', label: 'Common Name', sortable: true, type: 'string' },
    { id: 'actions', label: 'Actions', sortable: false, type: 'action' },
    { id: 'amount', label: 'Amount', sortable: true, type: 'number' },
    { id: 'location', label: 'Location', sortable: true, type: 'string' },
    { id: 'planted', label: 'Planted', sortable: true, type: 'date' },
    { id: 'lastWatered', label: 'Watered', sortable: true, type: 'date' },
    {
      id: 'lastFertilized',
      label: 'Fertilized',
      sortable: true,
      type: 'date',
    },
    { id: 'lastPruned', label: 'Pruned', sortable: true, type: 'date' },
    {
      id: 'lastHarvested',
      label: 'Harvested',
      sortable: true,
      type: 'date',
    },
  ];

  public static textFields: Record<string, InputFieldModel> = {
    searchQuery: { key: 'searchQuery', label: 'Search', defaultValue: '' },
    descriptionField: {
      key: 'description',
      label: 'Notes',
      defaultValue: '',
    },
    amount: {
      key: 'amount',
      label: 'Amount',
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
    { key: 'plantedBefore', label: 'Planted Before', defaultValue: '' },
    { key: 'plantedAfter', label: 'Planted After', defaultValue: '' },
    { key: 'lastWatered', label: 'Watered Before', defaultValue: '' },
    { key: 'lastFertilized', label: 'Fertilized Before', defaultValue: '' },
    { key: 'lastPruned', label: 'Pruned Before', defaultValue: '' },
    { key: 'lastHarvested', label: 'Harvested Before', defaultValue: '' },
  ];
}

export default BatchesData;
