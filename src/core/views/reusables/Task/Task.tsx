import React from 'react';
import styles from './Task.module.css';
import TextWithBoldSpan from '../TextWithBoldSpan/TextWithBoldSpan';
import { TextWithBoldSpanData } from '../../../../auxiliary/interfaces/TextWithBoldSpanData';
import { Priority } from '../../../../auxiliary/enums/Priority';
import { Category } from '../../../../auxiliary/enums/Category';

interface TaskProps {
  taskData: {
    id?: number | undefined;
    title: string;
    dueDate: string;
    priority: Priority;
    category: Category;
    completed: boolean;
    description: string;
  };
}

const Task: React.FC<TaskProps> = ({ taskData }) => {
  const { title, priority, category, completed, dueDate } = taskData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const textsWithBoldSpan: TextWithBoldSpanData[] = [
    { label: 'Due', boldSpan: formatDate(dueDate) },
    { label: 'Priority', boldSpan: priority },
    { label: 'Category', boldSpan: category },
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
      </div>
    </div>
  );
};

export default Task;
