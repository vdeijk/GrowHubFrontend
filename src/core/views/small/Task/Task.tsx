import React from "react";
import styles from "./Task.module.css";
import TextWithBoldSpan from "../TextWithBoldSpan/TextWithBoldSpan";

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

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className={`${styles.task} ${task.completed ? styles.completed : ""}`}>
      <div className={styles.taskInfo}>
        <h4 className={styles.taskTitle}>{task.title}</h4>
        <div className={styles.taskDetails}>
          <TextWithBoldSpan
            label="Due"
            boldSpan={task.dueDate.toLocaleDateString()}
          />
          <TextWithBoldSpan label="Priority" boldSpan={task.priority} />
        </div>
        <p className={styles.taskDescription}>{task.description}</p>
        <p className={`${styles.taskCategory} ${styles[task.category]}`}>
          {task.category}
        </p>
      </div>
    </div>
  );
};

export default Task;
