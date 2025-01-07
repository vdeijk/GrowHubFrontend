
export interface Task {
    id: number;
    title: string;
    dueDate: Date; 
    priority: "low" | "medium" | "high";
    category: "work" | "personal" | "other";
    completed: boolean;
    description: string;
  }