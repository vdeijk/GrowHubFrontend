import React from "react";
import styles from "./Task.module.css";

interface TaskProps {
  task: {
    id: number;
    title: string;
    dueDate: Date;
    priority: "low" | "medium" | "high";
    category: "work" | "personal" | "other";
    completed: boolean;
    description: string;
  };
  onToggleComplete: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onToggleComplete }) => {
  return (
    <div className={`${styles.task} ${task.completed ? styles.completed : ""}`}>
      <div className={styles.taskInfo}>
        <h4 className={styles.taskTitle}>{task.title}</h4>
        <div className={styles.taskDetails}>
          <p className={styles.taskDueDate}>
            Due: <span className={styles.bold}>{task.dueDate.toLocaleDateString()}</span>
          </p>
          <p className={styles.taskPriority}>
            Priority: <span className={styles.bold}>{task.priority}</span>
          </p>
        </div>
        <p className={styles.taskDescription}>{task.description}</p>
        <p className={`${styles.taskCategory} ${styles[task.category]}`}>
          {task.category}
        </p>
      </div>
      <div className={styles.taskActions}>
        <button
          onClick={onToggleComplete}
          className={styles.completeButton}
        ></button>
      </div>
    </div>
  );
};

export default Task;
