import React from 'react';
import styles from './Task.module.css';
import TextWithBoldSpan from '../TextWithBoldSpan/TextWithBoldSpan';
import { TextWithBoldSpanData } from '../../../../auxiliary/interfaces/TextWithBoldSpanData';
import { TodoItem } from '../../../../api';

interface TaskProps {
  taskData: TodoItem;
}

const Task: React.FC<TaskProps> = ({ taskData }) => {
  const { title, priority, category, dueDate } = taskData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const textsWithBoldSpan: TextWithBoldSpanData[] = [
    { label: 'Due', boldSpan: formatDate(dueDate || '') },
    { label: 'Priority', boldSpan: priority || 'N/A' },
    { label: 'Category', boldSpan: category || 'N/A' },
  ];

  return (
    <div className={`${styles.task}`}>
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
