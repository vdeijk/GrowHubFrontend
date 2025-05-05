import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddTaskData {
  public static textFields: Record<string, InputFieldModel> = {
    titleField: {
      key: 'title',
      label: 'Crop Name',
      defaultValue: '',
      required: true,
      readonly: true,
    },
    notes: { key: 'notes', label: 'Notes', defaultValue: '', required: false },
    batchId: {
      key: 'batchId',
      label: 'Batch Id',
      defaultValue: '',
      required: true,
    },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    priority: {
      key: 'priority',
      label: 'Priority',
      options: [],
      defaultValue: '',
      required: true,
    },
    category: {
      key: 'category',
      label: 'Category',
      options: [],
      defaultValue: '',
      required: true,
    },
    todoStatus: {
      key: 'todoStatus',
      label: 'Todo Status',
      options: [],
      defaultValue: '',
      required: true,
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'dueDate', label: 'Due Date', defaultValue: '', required: true },
  ];
}

export default AddTaskData;
