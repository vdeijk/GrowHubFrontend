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
import { DataMappingService } from '../../../services/DataMappingService/DatamappingService';

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
    await this.endpointService.postData(this.prepareData());

    taskStore.fetchData();
  };

  public loadTask = async (id: string) => {
    const data: TodoItem | undefined =
      await this.endpointService.getData<TodoItem>(`${id}`);

    if (!data) return;

    runInAction(() => {
      DataMappingService.mapInputFields(data, this.inputFields);
      DataMappingService.mapDropdownFields(data, this.dropdownFields);
      DataMappingService.mapDateFields(data, this.dateFields);
    });
  };

  public updateTask = async (id: string) => {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) return;

    await this.endpointService.putData(`${id}`, this.prepareData());

    taskStore.fetchData();
  };

  public validateForm() {
    if (this.validateRequired()) return true;

    return false;
  }

  private prepareData(): TodoItem {
    return {
      title: this.inputFields.title.value as string,
      notes: this.inputFields.notes.value as string,
      batchId: Number(this.inputFields.batchId.value),
      priority: this.dropdownFields.priority.value as TodoItemPriorityEnum,
      category: this.dropdownFields.category.value as TodoItemCategoryEnum,
      todoStatus: this.dropdownFields.todoStatus
        .value as TodoItemTodoStatusEnum,
      dueDate: this.dateFields.dueDate.value as string,
    };
  }
}

const addTaskStore = new AddTaskStore();
export default addTaskStore;
