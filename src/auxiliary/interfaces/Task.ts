import { Priority } from '../enums/Priority';
import { Category } from '../enums/Category';
import { JSX } from 'react';

export interface Task {
  id?: number;
  title: string;
   dueDate: Date;
  field: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  description: string;
  actions?: JSX.Element;
}
