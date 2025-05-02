import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddFieldData {
  public static textFields: Record<string, InputFieldModel> = {
    name: { key: 'name', label: 'Title', defaultValue: '' },
    latitude: { key: 'latitude', label: 'Latitude', defaultValue: '' },
    longitude: { key: 'longitude', label: 'Longitude', defaultValue: '' },
  };
}

export default AddFieldData;
