import React from 'react';
import styles from './Task.module.css';
import TextWithBoldSpan from '../TextWithBoldSpan/TextWithBoldSpan';
import { TextWithBoldSpanData } from '../../../../auxiliary/interfaces/TextWithBoldSpanData';

interface TaskProps {
  taskData: {
    id: number;
    title: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    category: 'work' | 'personal' | 'other';
    completed: boolean;
    description: string;
  };
}

const Task: React.FC<TaskProps> = ({ taskData }) => {
  const { title, dueDate, priority, category, completed, description } =
    taskData;

    const formattedDueDate =
    typeof dueDate === 'string' ? new Date(dueDate) : dueDate;

  const textsWithBoldSpan: TextWithBoldSpanData[] = [
    { label: 'Due', boldSpan: formattedDueDate.toLocaleDateString() },
    { label: 'Priority', boldSpan: priority },
  ];

  return (
    <div className={`${styles.task} ${completed ? styles.completed : ''}`}>
      <div className={styles.taskInfo}>
        <h4 className={styles.taskTitle}>{title}</h4>
        <div className={styles.taskDetails}>
          {textsWithBoldSpan.map((textWithBoldSpan, index) => (
            <TextWithBoldSpan
              key={index}
              textWithBoldSpanData={textWithBoldSpan}
            />
          ))}
        </div>
        <p className={styles.taskDescription}>{description}</p>
        <p className={`${styles.taskCategory} ${styles[category]}`}>
          {category}
        </p>
      </div>
    </div>
  );
};

export default Task;
