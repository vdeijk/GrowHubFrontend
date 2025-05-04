import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddFieldData {
  public static textFields: Record<string, InputFieldModel> = {
    name: { key: 'name', label: 'Title', defaultValue: '', required: true },
    notes: { key: 'notes', label: 'Notes', defaultValue: '', required: false },
    latitude: {
      key: 'latitude',
      label: 'Latitude',
      defaultValue: '',
      required: true,
    },
    longitude: {
      key: 'longitude',
      label: 'Longitude',
      defaultValue: '',
      required: true,
    },
  };
}

export default AddFieldData;
