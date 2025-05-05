import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddMeasurementData {
  public static textFields: Record<string, InputFieldModel> = {
    title: {
      key: 'title',
      label: 'Title Field',
      defaultValue: '',
      required: true,
    },
    notes: { key: 'notes', label: 'Notes', defaultValue: '' },
    soilPH: {
      key: 'soilPH',
      label: 'Soil PH',
      defaultValue: '',
      required: false,
    },
    batchId: {
      key: 'batchId',
      label: 'Batch Id',
      defaultValue: '',
      required: false,
    },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    soilDryness: {
      key: 'soilDryness',
      label: 'Soil Dryness',
      options: [],
      defaultValue: '',
      required: false,
    },
    growthStage: {
      key: 'growthStage',
      label: 'Growth Stage',
      options: [],
      defaultValue: '',
      required: true,
    },
    healthStatus: {
      key: 'healthStatus',
      label: 'Health Status',
      options: [],
      defaultValue: '',
      required: true,
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'date', label: 'Date', defaultValue: '', required: true },
  ];
}

export default AddMeasurementData;
