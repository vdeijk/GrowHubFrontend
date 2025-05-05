import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';
import { MonthEnum } from '../enums/MonthEnum';

class AddCropData {
  public static textFields: Record<string, InputFieldModel> = {
    commonName: {
      key: 'commonName',
      label: 'Common Name',
      defaultValue: '',
      required: true,
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

  private static setMonthOptions = () => {
    return [
      { label: '', value: '' },
      ...Object.values(MonthEnum).map((month) => ({
        label: month,
        value: month,
      })),
    ];
  };

  public static dropdownFields: Record<string, DropdownFieldModel> = {
    harvestStart: {
      key: 'harvestStart',
      label: 'Harvest Start',
      defaultValue: '',
      options: AddCropData.setMonthOptions(),
    },
    harvestEnd: {
      key: 'harvestEnd',
      label: 'Harvest End',
      defaultValue: '',
      options: AddCropData.setMonthOptions(),
    },
    pruningStart: {
      key: 'pruningStart',
      label: 'Pruning Start',
      defaultValue: '',
      options: AddCropData.setMonthOptions(),
    },
    pruningEnd: {
      key: 'pruningEnd',
      label: 'Pruning End',
      defaultValue: '',
      options: AddCropData.setMonthOptions(),
    },
    fertilizingStart: {
      key: 'fertilizingStart',
      label: 'Fertilizing Start',
      defaultValue: '',
      options: AddCropData.setMonthOptions(),
    },
    fertilizingEnd: {
      key: 'fertilizingEnd',
      label: 'Fertilizing End',
      defaultValue: '',
      options: AddCropData.setMonthOptions(),
    },
  };
}

export default AddCropData;
