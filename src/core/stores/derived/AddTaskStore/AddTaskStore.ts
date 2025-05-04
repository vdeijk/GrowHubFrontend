import { TodoItem } from '../../../../api';
import { BaseFormStore } from '../../base/BaseFormStore/BaseFormStore';
import taskStore from '../TasksStore/TasksStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { runInAction } from 'mobx';
import {
  TodoItemCategoryEnum,
  TodoItemPriorityEnum,
  TodoItemTodoStatusEnum,
} from '../../../../api';
import AddTaskData from '../../../../auxiliary/data/AddTaskData';

class AddTaskStore extends BaseFormStore {
  public endpointService = new EndpointService('Todo');

  constructor() {
    super();

    Object.values(AddTaskData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(AddTaskData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    AddTaskData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });
  }

  public addTask = async () => {
    const data: TodoItem = {
      title: this.inputFields.titleField.value as string,
      notes: this.inputFields.notes.value as string,
      priority: this.dropdownFields.priority.value as TodoItemPriorityEnum,
      category: this.dropdownFields.category.value as TodoItemCategoryEnum,
      todoStatus: this.dropdownFields.todoStatus
        .value as TodoItemTodoStatusEnum,
      dueDate: this.dateFields.dueDate.value as string,
    };

    await this.endpointService.postData(data);

    taskStore.fetchData();
  };

  public loadTask = async (id: string) => {
    const data: TodoItem | undefined =
      await this.endpointService.getData<TodoItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      this.inputFields.titleField.setValue(data.title ?? '');
      this.inputFields.notes.setValue(data.notes ?? '');
      this.dropdownFields.priority.setValue(data.priority ?? '');
      this.dropdownFields.category.setValue(data.category ?? '');
      this.dropdownFields.todoStatus.setValue(data.todoStatus ?? '');
      this.dateFields.dueDate.setValue(data.dueDate ?? '');
    });
  };

  public updateTask = async (id: string) => {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    const data: TodoItem = {
      title: this.inputFields.titleField.value as string,
      notes: this.inputFields.notes.value as string,
      priority: this.dropdownFields.priority.value as TodoItemPriorityEnum,
      category: this.dropdownFields.category.value as TodoItemCategoryEnum,
      todoStatus: this.dropdownFields.todoStatus
        .value as TodoItemTodoStatusEnum,
      dueDate: this.dateFields.dueDate.value as string,
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
