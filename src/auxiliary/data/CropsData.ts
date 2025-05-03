import { PlantItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class CropsData {
  public static tableHeaders: TableHeaderModel<PlantItem>[] = [
    { id: 'id', label: 'ID', sortable: true, type: 'number', tooltip: 'test' },
    {
      id: 'commonName',
      label: 'Common Name',
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
      id: 'waterCycle',
      label: 'Watering',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'pruningCycle',
      label: 'Pruning',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'fertilizationCycle',
      label: 'Fertilizing',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'harvestCycle',
      label: 'Harvesting',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'phMin',
      label: 'PH Min',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'phMax',
      label: 'PH Max',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'temperatureMin',
      label: 'Temp Min',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'temperatureMax',
      label: 'Temp Max',
      sortable: true,
      type: 'number',
      tooltip: 'test',
    },
    {
      id: 'harvestStart',
      label: 'Harvest Start',
      sortable: true,
      type: 'string',
      tooltip: 'test',
    },
    {
      id: 'harvestEnd',
      label: 'Harvest End',
      sortable: true,
      type: 'string',
      tooltip: 'test',
    },
    {
      id: 'pruningStart',
      label: 'Pruning Start',
      sortable: true,
      type: 'string',
      tooltip: 'test',
    },
    {
      id: 'pruningEnd',
      label: 'Pruning End',
      sortable: true,
      type: 'string',
      tooltip: 'test',
    },
    {
      id: 'fertilizingStart',
      label: 'Fertilizing Start',
      sortable: true,
      type: 'string',
      tooltip: 'test',
    },
    {
      id: 'fertilizingEnd',
      label: 'Fertilizing End',
      sortable: true,
      type: 'string',
      tooltip: 'test',
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
