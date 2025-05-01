import { DateFieldModel } from '../interfaces/DateFieldModel';
import { PlantItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';

class CropsDatabaseData {
  public static tableHeaders: TableHeaderModel<PlantItem>[] = [
    { id: 'id', label: 'ID', sortable: true, type: 'number' },
    { id: 'commonName', label: 'Common Name', sortable: true, type: 'string' },
    { id: 'actions', label: 'Actions', sortable: false, type: 'action' },
    { id: 'waterCycle', label: 'Water Cycle', sortable: true, type: 'number' },
    {
      id: 'pruningCycle',
      label: 'Pruning Cycle',
      sortable: true,
      type: 'number',
    },
    {
      id: 'fertilizationCycle',
      label: 'Fertilization Cycle',
      sortable: true,
      type: 'number',
    },
    {
      id: 'harvestCycle',
      label: 'Harvest Cycle',
      sortable: true,
      type: 'number',
    },
    {
      id: 'harvestStart',
      label: 'Harvest Start',
      sortable: true,
      type: 'date',
    },
    { id: 'harvestEnd', label: 'Harvest End', sortable: true, type: 'date' },
    {
      id: 'pruningStart',
      label: 'Pruning Start',
      sortable: true,
      type: 'date',
    },
    { id: 'pruningEnd', label: 'Pruning End', sortable: true, type: 'date' },
    {
      id: 'fertilizingStart',
      label: 'Fertilizing Start',
      sortable: true,
      type: 'date',
    },
    {
      id: 'fertilizingEnd',
      label: 'Fertilizing End',
      sortable: true,
      type: 'date',
    },
    { id: 'phMin', label: 'PH Min', sortable: true, type: 'number' },
    { id: 'phMax', label: 'PH Max', sortable: true, type: 'number' },
    {
      id: 'temperatureMin',
      label: 'Temperature Min',
      sortable: true,
      type: 'number',
    },
    {
      id: 'temperatureMax',
      label: 'Temperature Max',
      sortable: true,
      type: 'number',
    },
  ];

  public static dateFields: DateFieldModel[] = [
    { key: 'harvestStart', label: 'Harvest Start', defaultValue: '' },
    { key: 'harvestEnd', label: 'Harvest End', defaultValue: '' },
    { key: 'pruningStart', label: 'Pruning Start', defaultValue: '' },
    { key: 'pruningEnd', label: 'Pruning End', defaultValue: '' },
    { key: 'fertilizingStart', label: 'Fertilizing Start', defaultValue: '' },
    { key: 'fertilizingEnd', label: 'Fertilizing End', defaultValue: '' },
  ];
}

export default CropsDatabaseData;
