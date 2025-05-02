import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddCropData {
  public static textFields: Record<string, InputFieldModel> = {
    commonName: {
      key: 'commonName',
      label: 'Common Name',
      defaultValue: '',
    },
    notes: { key: 'notes', label: 'Notes', defaultValue: '' },
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
