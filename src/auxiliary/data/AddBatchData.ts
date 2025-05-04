import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddBatchData {
  public static textFields: Record<string, InputFieldModel> = {
    commonName: {
      key: 'commonName',
      label: 'Title Field',
      defaultValue: '',
      required: true,
    },
    notes: { key: 'notes', label: 'Notes', defaultValue: '' },
    amount: {
      key: 'amount',
      label: 'Amount',
      defaultValue: '',
      required: true,
    },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    location: {
      key: 'location',
      label: 'Location',
      options: [],
      defaultValue: '',
      required: false,
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'lastWatered', label: 'Last Watered', defaultValue: '' },
    { key: 'lastFertilized', label: 'Last Fertilized', defaultValue: '' },
    { key: 'lastPruned', label: 'Last Pruned', defaultValue: '' },
    { key: 'lastHarvested', label: 'Last Harvested', defaultValue: '' },
  ];
}

export default AddBatchData;
