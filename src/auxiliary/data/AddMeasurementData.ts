import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddMeasurementData {
  public static textFields: Record<string, InputFieldModel> = {
    titleField: { key: 'nameField', label: 'Title Field', defaultValue: '' },
    notes: { key: 'notes', label: 'Notes', defaultValue: '' },
    soilPH: { key: 'soilPH', label: 'Soil PH', defaultValue: '' },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    location: {
      key: 'location',
      label: 'Location',
      options: [],
      defaultValue: '',
    },
    growthStage: {
      key: 'growthStage',
      label: 'Growth Stage',
      options: [],
      defaultValue: '',
    },
    soilDryness: {
      key: 'soilDryness',
      label: 'Soil Dryness',
      options: [],
      defaultValue: '',
    },
    healthStatus: {
      key: 'healthStatus',
      label: 'Health Status',
      options: [],
      defaultValue: '',
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'date', label: 'Date', defaultValue: '' },
  ];
}

export default AddMeasurementData;
