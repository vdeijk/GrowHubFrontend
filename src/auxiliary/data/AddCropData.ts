import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { PlantItem } from '../../api';
import { TableHeaderModel } from '../interfaces/TableHeaderModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddCropData {
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

  public static textFields: Record<string, InputFieldModel> = {
    commonName: {
      key: 'commonName',
      label: 'Common Name',
      defaultValue: '',
    },
    descriptionField: {
      key: 'description',
      label: 'Notes',
      defaultValue: '',
    },
    waterCycle: {
      key: 'waterCycle',
      label: 'Water Cycle',
      defaultValue: '',
    },
    pruningCycle: {
      key: 'pruningCycle',
      label: 'Pruning Cycle',
      defaultValue: '',
    },
    fertilizationCycle: {
      key: 'fertilizationCycle',
      label: 'Fertilization Cycle',
      defaultValue: '',
    },
    harvestCycle: {
      key: 'harvestCycle',
      label: 'Harvest Cycle',
      defaultValue: '',
    },
    phMin: {
      key: 'phMin',
      label: 'PH Min',
      defaultValue: '',
    },
    phMax: {
      key: 'phMax',
      label: 'PH Max',
      defaultValue: '',
    },
    temperatureMin: {
      key: 'temperatureMin',
      label: 'Temperature Min',
      defaultValue: '',
    },
    temperatureMax: {
      key: 'temperatureMax',
      label: 'Temperature Max',
      defaultValue: '',
    },
  };

  public static dropdownFields: Record<string, DropdownFieldModel> = {
    harvestStart: {
      key: 'harvestStart',
      label: 'Harvest Start',
      defaultValue: '',
      options: [],
    },
    harvestEnd: {
      key: 'harvestEnd',
      label: 'Harvest End',
      defaultValue: '',
      options: [],
    },
    pruningStart: {
      key: 'pruningStart',
      label: 'Pruning Start',
      defaultValue: '',
      options: [],
    },
    pruningEnd: {
      key: 'pruningEnd',
      label: 'Pruning End',
      defaultValue: '',
      options: [],
    },
    fertilizingStart: {
      key: 'fertilizingStart',
      label: 'Fertilizing Start',
      defaultValue: '',
      options: [],
    },
    fertilizingEnd: {
      key: 'fertilizingEnd',
      label: 'Fertilizing End',
      defaultValue: '',
      options: [],
    },
  };
}

export default AddCropData;
