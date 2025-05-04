import { DateFieldModel } from '../interfaces/DateFieldModel';
import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { InputFieldModel } from '../interfaces/InputFieldModel';

class AddTaskData {
  public static textFields: Record<string, InputFieldModel> = {
    titleField: {
      key: 'title',
      label: 'Title Field',
      defaultValue: '',
      required: true,
    },
    notes: { key: 'notes', label: 'Notes', defaultValue: '', required: false },
  };

  public static dropdowns: Record<string, DropdownFieldModel> = {
    priority: {
      key: 'priority',
      label: 'Priority',
      options: [],
      defaultValue: '',
      required: false,
    },
    category: {
      key: 'category',
      label: 'Category',
      options: [],
      defaultValue: '',
      required: false,
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
