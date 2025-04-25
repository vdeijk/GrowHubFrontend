import { Task } from '../../../auxiliary/interfaces/Task';
import { runInAction } from 'mobx';
import { debounce } from '../../../auxiliary/utils/debounce';
import { Priority } from '../../../auxiliary/enums/Priority';
import { Category } from '../../../auxiliary/enums/Category';
import { SearchableStore } from '../BaseSearchableStore/BaseSearchableStore';
import { DropdownOption } from '../../../auxiliary/interfaces/DropdownOptions';
import { EndpointService } from '../../apis/EndpointService';

class TaskStore extends SearchableStore<Task> {
  private endpointService = new EndpointService('/Todo');

  constructor() {
    super(['title']);

    this.debouncedFilterItems = debounce(this.filterItems.bind(this), 500);

    this.setFilterCriteria('category', '');
    this.setFilterCriteria('priority', '');
    this.filterCriteria['category'].options = this.generateDropdownOptions(
      Object.values(Category),
      'All Categories',
    );

    this.filterCriteria['priority'].options = this.generateDropdownOptions(
      Object.values(Priority),
      'All Priorities',
    );
  }

  isLoading: boolean = false;
  tableHeaders: { id: keyof Task; label: string; sortable: boolean }[] = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'priority', label: 'Priority', sortable: true },
    { id: 'dueDate', label: 'Due Date', sortable: true },
    { id: 'description', label: 'Description', sortable: false },
    { id: 'category', label: 'Category', sortable: false },
    { id: 'actions', label: 'Actions', sortable: false },
  ];

  public toggleComplete(id: number) {
    const task = this.items.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
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
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public matchesFilterCriteria(item: Task): boolean {
    const categoryValue = this.filterCriteria['category'].value;
    const priorityValue = this.filterCriteria['priority'].value;

    const matchesCategory = this.matchesStringCriteria(
      item.category,
      categoryValue,
    );
    const matchesPriority = this.matchesStringCriteria(
      item.priority,
      priorityValue,
    );

    return matchesCategory && matchesPriority;
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
}

const taskStore = new TaskStore();
export default taskStore;
