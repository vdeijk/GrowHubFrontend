import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddMeasurementData {
  public static textFields: Record<string, InputFieldModel> = {
    title: { key: 'title', label: 'Title Field', defaultValue: '' },
    notes: { key: 'notes', label: 'Notes', defaultValue: '' },
    soilPH: { key: 'soilPH', label: 'Soil PH', defaultValue: '' },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    soilDryness: {
      key: 'soilDryness',
      label: 'Soil Dryness',
      options: [],
      defaultValue: '',
    },
    growthStage: {
      key: 'growthStage',
      label: 'Growth Stage',
      options: [],
      defaultValue: '',
    },
    healthStatus: {
      key: 'healthStatus',
      label: 'Health Status',
      options: [],
      defaultValue: '',
    },
    location: {
      key: 'location',
      label: 'Location',
      options: [],
      defaultValue: '',
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'date', label: 'Date', defaultValue: '' },
  ];
}

export default AddMeasurementData;
