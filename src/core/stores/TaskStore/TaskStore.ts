import { Task } from '../../../auxiliary/interfaces/Task';
import { debounce } from '../../../auxiliary/utils/debounce';
import { Priority } from '../../../auxiliary/enums/Priority';
import { Category } from '../../../auxiliary/enums/Category';
import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { DropdownOption } from '../../../auxiliary/interfaces/DropdownOptions';
import { EndpointService } from '../../apis/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import { TaskStatus } from '../../../auxiliary/enums/Task';
import EventBus from '../../../auxiliary/utils/EventTarget';
import { makeObservable, runInAction, observable, action } from 'mobx';

class TaskStore extends SearchableStore<Task> {
  private endpointService = new EndpointService('Todo');
  public paginationStore = new PaginationStore();

  constructor() {
    super(['title']);

    EventBus.addEventListener('pagination:currentPageChanged', () => {
      this.paginatedItems = this.paginationStore.paginateItems(
        this.filteredItems,
      );
    });

    this.debouncedFilterItems = debounce(this.filterItems.bind(this), 500);

    this.setDropdownFilters('category', '', 'Category');
    this.setDropdownFilters('priority', '', 'Priority');
    this.setDropdownFilters('status', '', 'Status');
    this.dropdownFilters['category'].options = this.generateDropdownOptions(
      Object.values(Category),
      '',
    );
    this.dropdownFilters['priority'].options = this.generateDropdownOptions(
      Object.values(Priority),
      '',
    );
    this.dropdownFilters['status'].options = this.generateDropdownOptions(
      Object.values(TaskStatus),
      '',
    );

    this.setDateFilters('startDate', '', 'Start Date');
    this.setDateFilters('endDate', '', 'End Date');

    makeObservable(this, {
      isLoading: observable,
      fetchData: action,
      matchesFilterCriteria: action,
    });
  }

  isLoading: boolean = false;
  tableHeaders: { id: keyof Task; label: string; sortable: boolean }[] = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'priority', label: 'Priority', sortable: true },
    { id: 'dueDate', label: 'Due Date', sortable: true },
    { id: 'category', label: 'Category', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
  ];

  public toggleComplete(id: number) {
    const task = this.items.find((task) => task.id === id);
    if (task) {
      //task.completed = !task.completed;
    }
  }

  public async fetchData() {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
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
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public matchesFilterCriteria(item: Task): boolean {
    const categoryValue = this.dropdownFilters['category'].value;
    const priorityValue = this.dropdownFilters['priority'].value;
    const startDateValue = this.dateFilters['startDate'].value;
    const endDateValue = this.dateFilters['endDate'].value;

    const matchesCategory = this.matchesStringCriteria(
      item.category,
      categoryValue,
    );
    const matchesPriority = this.matchesStringCriteria(
      item.priority,
      priorityValue,
    );

    const matchesDateRange = this.matchesDateRangeCriteria(
      item.dueDate,
      startDateValue,
      endDateValue,
    );

    return matchesCategory && matchesPriority && matchesDateRange;
  }

  public async deleteTask(id: number) {
    await this.endpointService.deleteData(id);

    this.fetchData();
  }

  private matchesStringCriteria = (
    itemValue: string | undefined,
    filterValue: string | undefined,
  ): boolean => {
    if (!filterValue || filterValue.trim() === '') return true;
    if (!itemValue) return false;
    return itemValue.toLowerCase() === filterValue.toLowerCase();
  };

  private generateDropdownOptions = <T extends string | number>(
    values: T[],
    allLabel: string = 'All',
  ): DropdownOption<T>[] => {
    return [
      { value: '' as T, label: allLabel },
      ...values.map((value) => ({
        value,
        label: String(value),
      })),
    ];
  };

  private matchesDateRangeCriteria(
    dueDate: string | undefined,
    startDate: string,
    endDate: string,
  ): boolean {
    if (!startDate || !endDate) return true;
    if (!dueDate) return false;

    const taskDate = new Date(dueDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const isAfterStartDate = !start || taskDate >= start;
    const isBeforeEndDate = !end || taskDate <= end;

    return isAfterStartDate && isBeforeEndDate;
  }
}

const taskStore = new TaskStore();
export default taskStore;
