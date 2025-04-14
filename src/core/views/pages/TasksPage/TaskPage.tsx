import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './TasksPage.module.css';
import { observer } from 'mobx-react-lite';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const TasksPage: React.FC = observer(() => {
  /*const handleEdit = (id: number) => {};

  const handleDelete = (id: number) => {
    taskStore.deleteTask(id);
  };*/

  return (
    <section className={styles.taskPage}>
      <LoadingWrapper isLoading={taskStore.isLoading}>
        {taskStore.tasks.map((task) => (
          <Task taskData={task} key={task.id} />
        ))}
      </LoadingWrapper>
    </section>
  );
});

export default TasksPage;
