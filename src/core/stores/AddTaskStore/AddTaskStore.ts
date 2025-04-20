import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { putData } from '../../apis/putData';
import { postData } from '../../apis/postData';
import cropsStore from '../CropsStore/CropsStore';
import { Category } from '../../../auxiliary/enums/Category';
import { Priority } from '../../../auxiliary/enums/Priority';
import { Task } from '../../../auxiliary/interfaces/Task';

class AddTaskStore {
  title: string = '';
  priority = Priority.Medium;
  field: string = '';
  dueDate: Date = new Date();
  description: string = '';
  category = Category.Work;
  completed: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public updateFormField(field: keyof AddTaskStore, value: string) {
    runInAction(() => {
      (this[field] as string) = value;
    });
  }

  public resetForm() {
    this.title = '';
    this.priority = Priority.Medium;
    this.field = '';
    this.description = '';
    this.category = Category.Work;
  }

  public async addCrop() {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data: Task = {
        title: this.title,
        priority: this.priority,
        dueDate: this.dueDate,
        description: this.description,
        category: this.category,
        completed: false,
      };

      // @ts-ignore
      await postData('/task', data);

      cropsStore.fetchData();
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async loadTask(id: string) {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const task: Task = await getData(`/task/${id}`);
      runInAction(() => {
        this.title = task.title;
        this.priority = task.priority;
        this.dueDate = task.dueDate;
        this.description = task.description;
        this.category = task.category;
        this.completed = task.completed;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public async updateCrop(id: string) {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) return;

    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data: Task = {
        title: this.title,
        priority: this.priority,
        dueDate: this.dueDate,
        description: this.description,
        category: this.category,
        completed: this.completed,
      };

      // @ts-ignore
      await putData(`/plant/${id}`, data);

      cropsStore.fetchData();
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const addTaskStore = new AddTaskStore();
export default addTaskStore;
