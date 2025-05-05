import { TodoItem } from '../../../../api';
import { SearchableStore } from '../../base/BaseSearchableStore/BaseSearchableStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { makeObservable, runInAction, action, computed } from 'mobx';
import TasksData from '../../../../auxiliary/data/TasksData';
import { PaginationService } from '../../../services/PaginationService/PaginationService';
import TableColoringService from '../TableColoringService/TableColoringService';
import { FilterService } from '../../../services/FilterService/FilterService';
import EventBus from '../../../services/EventBusService/EventBusService';

class TasksStore extends SearchableStore<TodoItem> {
  private endpointService = new EndpointService('Todo');
  public paginationService = new PaginationService();
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public tableHeaders = TasksData.tableHeaders;

  constructor() {
    super(['title']);

    Object.values(TasksData.textFieldsString).forEach((textField) => {
      this.initStringFilter(textField);
    });

    Object.values(TasksData.dropdowns).forEach((dropdown) => {
      this.initDropdownFilter(dropdown);
    });

    TasksData.dateFields.forEach((dateField) => {
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
    const dateKeys = ['dueDate'] as (keyof TodoItem)[];

    runInAction(() => {
      this.items = TableColoringService.getColoredDateValues(data, dateKeys);
      this.filteredItems = this.items;
      this.paginatedItems = this.paginationService.paginateItems(
        this.filteredItems,
      );
    });
  };

  public filterItems() {
    let filtered = FilterService.filterBySearchQuery(
      this.items,
      this.stringFilters.searchQuery.value,
      this.searchableFields,
    );
    filtered = FilterService.filterByDropdowns(filtered, this.dropdownFilters);
    filtered = FilterService.filterByEndDate(
      filtered,
      this.dateFilters['endDate'].value,
      'dueDate',
    );
    filtered = FilterService.filterByStartDate(
      filtered,
      this.dateFilters['startDate'].value,
      'dueDate',
    );

    runInAction(() => {
      this.filteredItems = this.sortService.sortItems(filtered);
      this.paginationService.setCurrentPage(1);
    });

    EventBus.dispatchEvent('filteredItems:updated', undefined);
  }

  public deleteTask = async (id: number) => {
    await this.endpointService.deleteData(id);

    this.fetchData();
  };
}

const tasksStore = new TasksStore();
export default tasksStore;
