import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './TasksPage.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';
//import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';

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
      <Heading level={1} text="AgriTasks"></Heading>

      {taskStore.tasks.map((task) => (
        <Task taskData={task} key={task.id} />
      ))}
      {/* <ButtonContainer {...buttonContainerData} /> */}
    </section>
  );
});

export default TasksPage;
