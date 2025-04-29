import { Task } from '../../../auxiliary/interfaces/Task';
import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { EndpointService } from '../../services/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { InputField } from '../../../auxiliary/classes/InputField';
import TaskData from '../../../auxiliary/classes/TaskData';

class TaskStore extends SearchableStore<Task> {
  private endpointService = new EndpointService('Todo');
  public paginationStore = new PaginationStore();
  public descriptionField: InputField<string>;
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public tableHeaders = TaskData.tableHeaders;
  public searchQuery = new InputField<string>(
    '',
    'Search',
    false,
    'Enter search query',
    50,
  );

  constructor() {
    super(['title']);

    this.descriptionField = new InputField<string>(
      '',
      'Description',
      false,
      'Enter task description',
      30,
    );

    Object.values(TaskData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    TaskData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });

    makeObservable(this, {
      isLoading: computed,
      searchQuery: observable,
      descriptionField: observable,
      fetchData: action,
    });
  }

  public fetchData = async () => {
    const data: Task[] | undefined =
      await this.endpointService.getData<Task[]>();

    if (!data) return;

    runInAction(() => {
      this.items = data;
      this.filteredItems = this.items;
      this.paginatedItems = this.paginationStore.paginateItems(
        this.filteredItems,
      );
    });
  };

  public deleteTask = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const taskStore = new TaskStore();
export default taskStore;
