import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './TasksPage.module.css';
import { observer } from 'mobx-react-lite';

const TasksPage: React.FC = observer(() => {
  // const buttonContainerData = {
  //   clickHandler: () => {},
  //   label: 'Add New Task',
  // };
  const handleEdit = (id: number) => {};

  const handleDelete = (id: number) => {
    taskStore.deleteTask(id);
  };

  return (
    <section className={styles.taskPage}>
      {taskStore.tasks.map((task) => (
        <Task taskData={task} key={task.id} />
      ))}
      {/* <ButtonContainer {...buttonContainerData} /> */}
    </section>
  );
});

export default TasksPage;
