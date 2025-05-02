import { InputFieldModel } from '../interfaces/InputFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { MonthEnum } from '../enums/MonthEnum';

class AddCropData {
  public static textFields: Record<string, InputFieldModel> = {
    nameField: { key: 'commonName', label: 'Common Name', defaultValue: '' },
  
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
  };
}

export default AddCropData;
