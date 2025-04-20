import { Priority } from '../enums/Priority';
import { Category } from '../enums/Category';

export interface Task {
  id: number;
  title: string;
  dueDate: Date;
  priority: Priority;
  category: Category;
  completed: boolean;
  description: string;
}
