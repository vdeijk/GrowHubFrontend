import { TodoItem } from '../../../../api';
import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { makeObservable, runInAction, action, computed } from 'mobx';
import TaskData from '../../../../auxiliary/classes/TaskData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import { toJS } from 'mobx';

class TaskStore extends SearchableStore<TodoItem> {
  private endpointService = new EndpointService('Todo');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public tableHeaders = TaskData.tableHeaders;

  constructor() {
    super(['title']);

    Object.values(TaskData.textFields).forEach((textField) => {
      this.initTextFilter(textField);
    });

    Object.values(TaskData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    TaskData.dateFields.forEach((dateField) => {
      this.initDateFilter(dateField);
    });

    makeObservable(this, {
      isLoading: computed,
      fetchData: action,
    });
  }

  public fetchData = async () => {
    const data: TodoItem[] | undefined =
      await this.endpointService.getData<TodoItem[]>();

    if (!data) return;

    runInAction(() => {
      this.items = data;
      this.filteredItems = this.items;
      this.paginatedItems = this.paginationService.paginateItems(
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
