import { Category } from '../../../auxiliary/enums/Category';
import { Priority } from '../../../auxiliary/enums/Priority';
import { Task } from '../../../auxiliary/interfaces/Task';
import { BaseFormStore } from '../BaseFormStore/BaseFormStore';
import { InputField } from '../../../auxiliary/classes/InputField';
import taskStore from '../TaskStore/TaskStore';
import { EndpointService } from '../../apis/EndpointService';
import { runInAction } from 'mobx';
import { DateField } from '../../../auxiliary/classes/DateField';
import { TaskStatus } from '../../../auxiliary/enums/Task';

class AddTaskStore extends BaseFormStore {
  public endpointService = new EndpointService('Todo');

  constructor() {
    super();

    //@ts-ignore
    this.fields = {
      titleField: new InputField<string>(
        '',
        'Title',
        true,
        'Enter task title',
        30,
      ),
      priorityField: new InputField<Priority>(
        Priority.Medium,
        'Priority',
        true,
      ),
      fieldField: new InputField<string>(
        '',
        'Field',
        false,
        'Enter field name',
        30,
      ),
      dueDateField: new DateField<string>('', 'Due Date', true),
      descriptionField: new InputField<string>(
        '',
        'Description',
        false,
        'Enter task description',
        30,
      ),
      categoryField: new InputField<Category>(Category.Work, 'Category', true),
      statusField: new InputField<TaskStatus>(TaskStatus.NotStarted, 'Status', true),
    } as Record<
      string,
      InputField<string | number | boolean> | DateField<string>
    >;
  }

  public addTask = async () => {
    const data: Task = {
      title: this.fields.titleField.value as string,
      priority: this.fields.priorityField.value as Priority,
      dueDate: this.fields.dueDateField.value as string,
      description: this.fields.descriptionField.value as string,
      category: this.fields.categoryField.value as Category,
      status: this.fields.statusField.value as TaskStatus,
    };

    await this.endpointService.postData(data);

    taskStore.fetchData();
  };

  public loadTask = async (id: string) => {
    const data: Task | undefined = await this.endpointService.getData<Task>(
      `${id}`,
    );

    if (!data) return;

    runInAction(() => {
      this.fields.titleField.setValue(data.title);
      this.fields.priorityField.setValue(data.priority);
      this.fields.dueDateField.setValue(data.dueDate);
      this.fields.descriptionField.setValue(data.description);
      this.fields.categoryField.setValue(data.category);
      this.fields.statusField.setValue(data.status);
    });
  };

  public updateTask = async (id: string) => {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    const data: Task = {
      title: this.fields.titleField.value as string,
      priority: this.fields.priorityField.value as Priority,
      dueDate: this.fields.dueDateField.value as string,
      description: this.fields.descriptionField.value as string,
      category: this.fields.categoryField.value as Category,
      status: this.fields.statusField.value as TaskStatus,
    };

    await this.endpointService.putData(`${id}`, data);

    taskStore.fetchData();
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }
}

const addTaskStore = new AddTaskStore();
export default addTaskStore;
