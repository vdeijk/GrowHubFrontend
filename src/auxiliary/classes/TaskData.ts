import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import { Category } from '../enums/Category';
import { Priority } from '../enums/Priority';
import { TaskStatus } from '../enums/Task';

class TaskData {
  public static tableHeaders = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'priority', label: 'Priority', sortable: true },
    { id: 'dueDate', label: 'Due Date', sortable: true },
    { id: 'category', label: 'Category', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
  ];

  public static dropdowns: Record<string, DropdownFieldModel> = {
    category: {
      key: 'category',
      label: 'Category',
      options: Object.values(Category),
      defaultValue: '',
    },
    priority: {
      key: 'priority',
      label: 'Priority',
      options: Object.values(Priority),
      defaultValue: '',
    },
    status: {
      key: 'status',
      label: 'Status',
      options: Object.values(TaskStatus),
      defaultValue: '',
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'startDate', label: 'Start Date', defaultValue: '' },
    { key: 'endDate', label: 'End Date', defaultValue: '' },
  ];
}

export default TaskData;
