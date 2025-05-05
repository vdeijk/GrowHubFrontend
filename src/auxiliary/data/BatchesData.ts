import fieldsStore from '../../core/stores/derived/FieldsStore/FieldsStore';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import { YourCropItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class BatchesData {
  public static tableHeaders: TableHeaderModel<YourCropItem>[] = [
    {
      id: 'id',
      label: 'Id',
      sortable: true,
      type: 'number',
      tooltip: 'Use this identifier to link the batch to a reading or task',
    },
    {
      id: 'commonName',
      label: 'Crop Name',
      sortable: true,
      type: 'string',
      tooltip: 'The common name of the batch',
    },
    {
      id: 'cropId',
      label: 'Crop Id',
      sortable: true,
      type: 'string',
      tooltip: 'Use this identifier to link the batch to a crop type',
    },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
      type: 'action',
      tooltip: 'View, edit or delete the batch',
    },
    {
      id: 'amount',
      label: 'Amount',
      sortable: true,
      type: 'number',
      tooltip: 'How many plants are in this batch',
    },
    {
      id: 'location',
      label: 'Location',
      sortable: true,
      type: 'string',
      tooltip: 'The field where the batch is located',
    },
    {
      id: 'planted',
      label: 'Planted',
      sortable: true,
      type: 'date',
      tooltip: 'The date when the batch was planted',
    },
    {
      id: 'lastWatered',
      label: 'Watered',
      sortable: true,
      type: 'date',
      tooltip: 'The date when the batch was last watered',
    },
    {
      id: 'lastFertilized',
      label: 'Fertilized',
      sortable: true,
      type: 'date',
      tooltip: 'The date when the batch was last fertilized',
    },
    {
      id: 'lastPruned',
      label: 'Pruned',
      sortable: true,
      type: 'date',
      tooltip: 'The date when the batch was last pruned',
    },
    {
      id: 'lastHarvested',
      label: 'Harvested',
      sortable: true,
      type: 'date',
      tooltip: 'The date when the batch was last harvested',
    },
  ];

  public static textFieldsString: Record<string, InputFieldModel> = {
    searchQuery: { key: 'searchQuery', label: 'Search', defaultValue: '' },
    descriptionField: {
      key: 'description',
      label: 'Notes',
      defaultValue: '',
    },
  };

  public static textFieldsNumber: Record<string, InputFieldModel> = {
    phMin: {
      key: 'maxAmount',
      label: 'Maximum Amount',
      defaultValue: '',
    },
    phMax: {
      key: 'minAmount',
      label: 'Minimum Amount',
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
    { key: 'lastWatered', label: 'Watered Before', defaultValue: '' },
    { key: 'lastFertilized', label: 'Fertilized Before', defaultValue: '' },
    { key: 'lastPruned', label: 'Pruned Before', defaultValue: '' },
    { key: 'lastHarvested', label: 'Harvested Before', defaultValue: '' },
  ];
}

export default BatchesData;
