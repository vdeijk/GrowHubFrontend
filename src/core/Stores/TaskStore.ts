import { makeAutoObservable } from "mobx";

interface Task {
  id: number;
  title: string;
  dueDate: Date; 
  priority: "low" | "medium" | "high";
  category: "work" | "personal" | "other";
  completed: boolean;
  description: string;
}

class TaskStore {
  tasks: Task[] = [
    {
      id: 1,
      title: "Task 1",
      dueDate: new Date("2023-12-01"),
      priority: "high",
      completed: false,
      category: "work",
      description: "This is a description for task 1",
    },
    {
      id: 2,
      title: "Task 2",
      dueDate: new Date("2023-12-05"),
      priority: "medium",
      completed: false,
      category: "work",
      description: "This is a description for task 2",
    },
    {
      id: 3,
      title: "Task 3",
      dueDate: new Date("2023-12-10"),
      priority: "low",
      completed: true,
      category: "work",
      description: "This is a description for task 3",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  toggleComplete(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }
}

const taskStore = new TaskStore();
export default taskStore;
