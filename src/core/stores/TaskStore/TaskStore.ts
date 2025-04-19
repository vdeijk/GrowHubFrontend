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

  public addTask(task: Task) {
    task.id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
    this.tasks.push(task);
  }

  public updateTask(id: number, updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask, id };
    }
  }

  public deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public async fetchData() {
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
