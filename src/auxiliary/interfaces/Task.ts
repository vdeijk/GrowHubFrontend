
import { JSX } from 'react';
import { TodoItemPriorityEnum } from '../../api';
import { TodoItemCategoryEnum } from '../../api';
import { TodoItemTodoStatusEnum } from '../../api';


export interface Task {
  id?: number;
  title: string;
  dueDate: string;
  priority: TodoItemPriorityEnum;
  category: TodoItemCategoryEnum;
  status: TodoItemTodoStatusEnum;
  description: string;
  actions?: JSX.Element;
}
