import { makeAutoObservable } from 'mobx';
import { Task } from '../../../auxiliary/interfaces/Task';
import { runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { TextInputState } from '../../../auxiliary/interfaces/TextInputState';
import { debounce } from '../../../auxiliary/utils/debounce';
import { validate } from '../../../auxiliary/utils/validationMaxLength';
import { Priority } from '../../../auxiliary/enums/Priority';
import { Category } from '../../../auxiliary/enums/Category';
import { deleteData } from '../../apis/deleteData';

class TaskStore {
  tasks: Task[] = [];
  isLoading = false;
  searchQuery: TextInputState = { value: '', error: '', maxLength: 10 };
  filterCriteria: { category: string | null; priority: string | null } = {
    category: null,
    priority: null,
  };
  filteredTasks: Task[] = [];
  tableHeaders: { id: keyof Task; label: string; sortable: boolean }[] = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'priority', label: 'Priority', sortable: true },
    { id: 'dueDate', label: 'Due Date', sortable: true },
    { id: 'description', label: 'Description', sortable: false },
    { id: 'category', label: 'Category', sortable: false },
    { id: 'actions', label: 'Actions', sortable: false },
  ];
  debouncedFilteredTasks: () => void;
  categoryOptions = [
    { value: null, label: 'All' },
    ...Object.values(Category).map((category) => ({
      value: category,
      label: category,
    })),
  ];
  priorityOptions = [
    { value: null, label: 'All' },
    ...Object.values(Priority).map((priority) => ({
      value: priority,
      label: priority,
    })),
  ];
  sortField: keyof Task | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {
    makeAutoObservable(this);

    this.fetchData();

    this.debouncedFilteredTasks = debounce(this.filterTasks.bind(this), 500);
  }

  public toggleComplete(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  public addTask(task: Task) {
    task.id = this.tasks.length
      ? (this.tasks[this.tasks.length - 1]?.id ?? 0) + 1
      : 1;
    this.tasks.push(task);
  }

  public updateTask(id: number, updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask, id };
    }
  }

  public async deleteTask(id: number) {
    await deleteData(`/todo/${id}`, id);

    this.fetchData();
  }

  public async fetchData() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const tasks = await getData('/Todo');

      runInAction(() => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public setSortField = (field: keyof Task) => {
    runInAction(() => {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortOrder = 'asc';
      }
      this.sortTasks();
    });
  };

  public sortTasks = () => {
    this.filteredTasks = this.filteredTasks.slice().sort((a, b) => {
      const fieldA = (a as Task)[this.sortField as keyof Task];
      const fieldB = (b as Task)[this.sortField as keyof Task];
      if (fieldA === undefined || fieldB === undefined) {
        return 0;
      }
      if (fieldA < fieldB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  public setFilterCriteria = (
    type: 'category' | 'priority',
    value: string | null,
  ) => {
    runInAction(() => {
      this.filterCriteria[type] = value;
      this.filterTasks();
    });
  };

  public setSearchQuery = (query: string) => {
    runInAction(() => {
      this.searchQuery.error = validate(query, this.searchQuery.maxLength);

      if (this.searchQuery.error) {
        return;
      }

      this.searchQuery.value = query;

      this.debouncedFilteredTasks();
    });
  };
  public filterTasks = () => {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearchQuery = task.title
        .toLowerCase()
        .includes(this.searchQuery.value.toLowerCase());
      const matchesCategory =
        !this.filterCriteria.category ||
        task.category.toLowerCase() ===
          this.filterCriteria.category.toLowerCase();
      const matchesPriority =
        !this.filterCriteria.priority ||
        task.priority.toLowerCase() ===
          this.filterCriteria.priority.toLowerCase();

      const matches = matchesSearchQuery && matchesCategory && matchesPriority;
      return matches;
    });
  };
}

const taskStore = new TaskStore();
export default taskStore;
