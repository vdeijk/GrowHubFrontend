import { TodoItem } from '../../../../api';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import { InputField } from '../../../../auxiliary/classes/InputField';
import taskStore from '../TaskStore/TaskStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import { DateField } from '../../../../auxiliary/classes/DateField';
import {
  TodoItemCategoryEnum,
  TodoItemPriorityEnum,
  TodoItemTodoStatusEnum,
} from '../../../../api';

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
      priorityField: new InputField<TodoItemPriorityEnum>(
        TodoItemPriorityEnum.Medium,
        'Priority',
        true,
      ),
      dueDateField: new DateField<string>('', 'Due Date', true),
      descriptionField: new InputField<string>(
        '',
        'Description',
        false,
        'Enter task description',
        30,
      ),
      categoryField: new InputField<TodoItemCategoryEnum>(
        TodoItemCategoryEnum.Work,
        'Category',
        true,
      ),
      statusField: new InputField<TodoItemTodoStatusEnum>(
        TodoItemTodoStatusEnum.NotStarted,
        'Status',
        true,
      ),
    } as Record<
      string,
      InputField<string | number | boolean> | DateField<string>
    >;
  }

  public addTask = async () => {
    const data: TodoItem = {
      title: this.fields.titleField.value as string,
      priority: this.fields.priorityField.value as TodoItemPriorityEnum,
      dueDate: this.fields.dueDateField.value as string,
      description: this.fields.descriptionField.value as string,
      category: this.fields.categoryField.value as TodoItemCategoryEnum,
      todoStatus: this.fields.statusField.value as TodoItemTodoStatusEnum,
    };

    await this.endpointService.postData(data);

    taskStore.fetchData();
  };

  public loadTask = async (id: string) => {
    const data: TodoItem | undefined =
      await this.endpointService.getData<TodoItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.fields.titleField.setValue(data.title ?? '');
      this.fields.priorityField.setValue(data.priority ?? '');
      this.fields.dueDateField.setValue(data.dueDate ?? '');
      this.fields.descriptionField.setValue(data.description ?? '');
      this.fields.categoryField.setValue(data.category ?? '');
      this.fields.statusField.setValue(data.todoStatus ?? '');
    });
  };

  public updateTask = async (id: string) => {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    const data: TodoItem = {
      title: this.fields.titleField.value as string,
      priority: this.fields.priorityField.value as TodoItemPriorityEnum,
      dueDate: this.fields.dueDateField.value as string,
      description: this.fields.descriptionField.value as string,
      category: this.fields.categoryField.value as TodoItemCategoryEnum,
      todoStatus: this.fields.statusField.value as TodoItemTodoStatusEnum,
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
