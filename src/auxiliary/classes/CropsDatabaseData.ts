import { DateFieldModel } from '../interfaces/DateFieldModel';
import { PlantItem } from '../../api';

class CropsDatabaseData {
  public static tableHeaders: {
    id: keyof PlantItem | 'actions';
    label: string;
    sortable: boolean;
  }[] = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'commonName', label: 'Common Name', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'waterCycle', label: 'Water Cycle', sortable: true },
    { id: 'pruningCycle', label: 'Pruning Cycle', sortable: true },
    { id: 'fertilizationCycle', label: 'Fertilization Cycle', sortable: true },
    { id: 'harvestCycle', label: 'Harvest Cycle', sortable: true },
    { id: 'harvestStart', label: 'Harvest Start', sortable: true },
    { id: 'harvestEnd', label: 'Harvest End', sortable: true },
    { id: 'pruningStart', label: 'Pruning Start', sortable: true },
    { id: 'pruningEnd', label: 'Pruning End', sortable: true },
    { id: 'fertilizingStart', label: 'Fertilizing Start', sortable: true },
    { id: 'fertilizingEnd', label: 'Fertilizing End', sortable: true },
    { id: 'phMin', label: 'PH Min', sortable: true },
    { id: 'phMax', label: 'PH Max', sortable: true },
    { id: 'temperatureMin', label: 'Temperature Min', sortable: true },
    { id: 'temperatureMax', label: 'Temperature Max', sortable: true },
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
