import React from 'react';
import Task from '../../Small/Task/Task';
import taskStore from '../../Stores/TaskStore';
import styles from './TaskList.module.css';
import { observer } from 'mobx-react-lite';

const TaskList: React.FC = observer(() => {
  return (
    <div className={styles.taskList}>
      <h6 className={styles.taskList__h6}>Upcoming Tasks</h6>
      {taskStore.tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={() => taskStore.toggleComplete(task.id)}
        />
      ))}
    </div>
  );
});

export default TaskList;