import { Priority } from '../enums/Priority';
import { Category } from '../enums/Category';
import { JSX } from 'react';
import { TaskStatus } from '../enums/Task';

export interface Task {
  id?: number;
  title: string;
  dueDate: string;
  priority: Priority;
  category: Category;
  status: TaskStatus;
  description: string;
  actions?: JSX.Element;
}
