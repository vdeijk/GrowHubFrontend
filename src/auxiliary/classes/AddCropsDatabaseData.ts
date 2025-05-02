import { InputFieldModel } from '../interfaces/InputFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { MonthEnum } from '../enums/MonthEnum';

class AddCropsDatabaseData {
  public static textFields: Record<string, InputFieldModel> = {
    nameField: { key: 'commonName', label: 'Common Name', defaultValue: '' },
    waterCycle: { key: 'waterCycle', label: 'Water Cycle', defaultValue: '' },
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
      options: Object.values(MonthEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    harvestEnd: {
      key: 'harvestEnd',
      label: 'Harvest End',
      options: Object.values(MonthEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    pruningStart: {
      key: 'pruningStart',
      label: 'Pruning Start',
      options: Object.values(MonthEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    pruningEnd: {
      key: 'pruningEnd',
      label: 'Pruning End',
      options: Object.values(MonthEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    fertilizingStart: {
      key: 'fertilizingStart',
      label: 'Fertilizing Start',
      options: Object.values(MonthEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
    fertilizingEnd: {
      key: 'fertilizingEnd',
      label: 'Fertilizing End',
      options: Object.values(MonthEnum).map((value) => ({
        value: value,
        label: value,
      })),
      defaultValue: '',
    },
  };
}

export default AddCropsDatabaseData;
