import { PlantItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class CropsData {
  public static tableHeaders: TableHeaderModel<PlantItem>[] = [
    { id: 'id', label: 'ID', sortable: true, type: 'number' },
    { id: 'commonName', label: 'Common Name', sortable: true, type: 'string' },
    { id: 'actions', label: 'Actions', sortable: false, type: 'action' },
    { id: 'waterCycle', label: 'Watering', sortable: true, type: 'number' },
    {
      id: 'pruningCycle',
      label: 'Pruning',
      sortable: true,
      type: 'number',
    },
    {
      id: 'fertilizationCycle',
      label: 'Fertilizing',
      sortable: true,
      type: 'number',
    },
    {
      id: 'harvestCycle',
      label: 'Harvesting',
      sortable: true,
      type: 'number',
    },
    { id: 'phMin', label: 'PH Min', sortable: true, type: 'number' },
    { id: 'phMax', label: 'PH Max', sortable: true, type: 'number' },
    {
      id: 'temperatureMin',
      label: 'Temp Min',
      sortable: true,
      type: 'number',
    },
    {
      id: 'temperatureMax',
      label: 'Temp Max',
      sortable: true,
      type: 'number',
    },
    {
      id: 'harvestStart',
      label: 'Harvest Start',
      sortable: true,
      type: 'string',
    },
    { id: 'harvestEnd', label: 'Harvest End', sortable: true, type: 'string' },
    {
      id: 'pruningStart',
      label: 'Pruning Start',
      sortable: true,
      type: 'string',
    },
    { id: 'pruningEnd', label: 'Pruning End', sortable: true, type: 'string' },
    {
      id: 'fertilizingStart',
      label: 'Fertilizing Start',
      sortable: true,
      type: 'string',
    },
    {
      id: 'fertilizingEnd',
      label: 'Fertilizing End',
      sortable: true,
      type: 'string',
    },
  ];

  public static textFields: Record<string, InputFieldModel> = {
    searchQuery: { key: 'searchQuery', label: 'Search', defaultValue: '' },
    descriptionField: {
      key: 'description',
      label: 'Notes',
      defaultValue: '',
    },
  };
}

export default CropsData;

/*import { DateFieldModel } from '../interfaces/DateFieldModel';
  public static dateFields: DateFieldModel[] = [
    { key: 'harvestStart', label: 'Harvest Start', defaultValue: '' },
    { key: 'harvestEnd', label: 'Harvest End', defaultValue: '' },
    { key: 'pruningStart', label: 'Pruning Start', defaultValue: '' },
    { key: 'pruningEnd', label: 'Pruning End', defaultValue: '' },
    { key: 'fertilizingStart', label: 'Fertilizing Start', defaultValue: '' },
    { key: 'fertilizingEnd', label: 'Fertilizing End', defaultValue: '' },
  ];*/