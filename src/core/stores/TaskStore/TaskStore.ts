import { Task } from '../../../auxiliary/interfaces/Task';
import { Priority } from '../../../auxiliary/enums/Priority';
import { Category } from '../../../auxiliary/enums/Category';
import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { EndpointService } from '../../apis/EndpointService';
import { PaginationStore } from '../PaginationStore/PaginationStore';
import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from 'mobx';
import { TaskStatus } from '../../../auxiliary/enums/Task';
import { InputField } from '../../../auxiliary/classes/InputField';

class TaskStore extends SearchableStore<Task> {
  private endpointService = new EndpointService('Todo');
  public paginationStore = new PaginationStore();
  public descriptionField: InputField<string>;
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public tableHeaders: { id: keyof Task; label: string; sortable: boolean }[] =
    [
      { id: 'title', label: 'Title', sortable: true },
      { id: 'priority', label: 'Priority', sortable: true },
      { id: 'dueDate', label: 'Due Date', sortable: true },
      { id: 'category', label: 'Category', sortable: true },
      { id: 'status', label: 'Status', sortable: true },
      { id: 'actions', label: 'Actions', sortable: false },
    ];
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

    this.initDropdownFilter(
      'category',
      '',
      'Category',
      Object.values(Category),
      '',
    );
    this.initDropdownFilter(
      'priority',
      '',
      'Priority',
      Object.values(Priority),
      '',
    );
    this.initDropdownFilter(
      'status',
      '',
      'Status',
      Object.values(TaskStatus),
      '',
    );
    this.initDateFilter('startDate', '', 'Start Date');
    this.initDateFilter('endDate', '', 'End Date');

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
