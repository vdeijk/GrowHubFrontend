import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddTaskData {
  public static textFields: Record<string, InputFieldModel> = {
    titleField: { key: 'titleField', label: 'Title Field', defaultValue: '' },
    notes: { key: 'notes', label: 'Notes', defaultValue: '' },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    priority: {
      key: 'priority',
      label: 'Priority',
      options: [],
      defaultValue: '',
    },
    category: {
      key: 'category',
      label: 'Category',
      options: [],
      defaultValue: '',
    },
    todoStatus: {
      key: 'todoStatus',
      label: 'Todo Status',
      options: [],
      defaultValue: '',
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'dueDate', label: 'Due Date', defaultValue: '' },
  ];
}

export default AddTaskData;
