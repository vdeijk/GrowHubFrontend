import { makeAutoObservable } from 'mobx';
import { Task } from '../../../auxiliary/interfaces/Task';
import { runInAction } from 'mobx';
import { getData } from '../../apis/getData';

class TaskStore {
  tasks: Task[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  public toggleComplete(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  private async fetchData() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const tasks = await getData('/Todo');

      runInAction(() => {
        this.tasks = tasks;
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const taskStore = new TaskStore();
export default taskStore;
