import { Category } from '../../../auxiliary/enums/Category';
import { Priority } from '../../../auxiliary/enums/Priority';
import { Task } from '../../../auxiliary/interfaces/Task';
import { BaseFormStore } from '../BaseFormStore/BaseFormStore';
import { InputField } from '../../../auxiliary/classes/InputField';
import taskStore from '../TaskStore/TaskStore';

class AddTaskStore extends BaseFormStore<Task> {
  constructor() {
    super();

    this.fields = {
      titleField: new InputField<string>('', 'Title', true, 'Enter task title'),
      priorityField: new InputField<Priority>(
        Priority.Medium,
        'Priority',
        true,
      ),
      fieldField: new InputField<string>('', 'Field', false, 'Enter field name'),
      dueDateField: new InputField<Date>(new Date(), 'Due Date', false),
      descriptionField: new InputField<string>(
        '',
        'Description',
        false,
        'Enter task description',
      ),
      categoryField: new InputField<Category>(Category.Work, 'Category', true),
      completedField: new InputField<boolean>(false, 'Completed', false),
    };
  }

  public async addTask() {
    const data: Task = {
      title: this.fields.titleField.value as string,
      priority: this.fields.priorityField.value as Priority,
      field: this.fields.fieldField.value as string,
      dueDate: this.fields.dueDateField.value as string,
      description: this.fields.descriptionField.value as string,
      category: this.fields.categoryField.value as Category,
      completed: this.fields.completedField.value as boolean,
    };

    await this.addData('/todo', data);
    taskStore.fetchData();
  }

  public async loadTask(id: string) {
    await this.loadData(`/todo/${id}`, (task) => {
      this.fields.titleField.setValue(task.title);
      this.fields.priorityField.setValue(task.priority);
      this.fields.fieldField.setValue(task.field);
      this.fields.dueDateField.setValue(new Date(task.dueDate));
      this.fields.descriptionField.setValue(task.description);
      this.fields.categoryField.setValue(task.category);
      this.fields.completedField.setValue(task.completed);
    });
  }

  public async updateTask(id: string) {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    const data: Task = {
      title: this.fields.titleField.value as string,
      priority: this.fields.priorityField.value as Priority,
      field: this.fields.fieldField.value as string,
      dueDate: this.fields.dueDateField.value as string,
      description: this.fields.descriptionField.value as string,
      category: this.fields.categoryField.value as Category,
      completed: this.fields.completedField.value as boolean,
    };

    await this.editData(`/todo/${id}`, data);
    taskStore.fetchData();
  }
}

const addTaskStore = new AddTaskStore();
export default addTaskStore;
