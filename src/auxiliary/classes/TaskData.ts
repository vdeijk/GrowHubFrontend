import { DropdownFieldModel } from '../interfaces/DropdownFieldModel';
import { DateFieldModel } from '../interfaces/DateFieldModel';
import { TodoItemCategoryEnum } from '../../api';
import { TodoItemPriorityEnum } from '../../api';
import { TodoItemTodoStatusEnum } from '../../api';
import { TodoItem } from '../../api';

class TaskData {
  public static tableHeaders: {
    id: keyof TodoItem | 'actions';
    label: string;
    sortable: boolean;
  }[] = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
    { id: 'priority', label: 'Priority', sortable: true },
    { id: 'dueDate', label: 'Due Date', sortable: true },
    { id: 'category', label: 'Category', sortable: true },
    { id: 'todoStatus', label: 'Status', sortable: true },
  ];

  public static dropdowns: Record<string, DropdownFieldModel> = {
    category: {
      key: 'category',
      label: 'Category',
      options: Object.values(TodoItemCategoryEnum),
      defaultValue: '',
    },
    priority: {
      key: 'priority',
      label: 'Priority',
      options: Object.values(TodoItemPriorityEnum),
      defaultValue: '',
    },
    status: {
      key: 'todoStatus',
      label: 'Status',
      options: Object.values(TodoItemTodoStatusEnum),
      defaultValue: '',
    },
  };

  public static dateFields: DateFieldModel[] = [
    { key: 'startDate', label: 'Start Date', defaultValue: '' },
    { key: 'endDate', label: 'End Date', defaultValue: '' },
  ];
}

export default TaskData;
