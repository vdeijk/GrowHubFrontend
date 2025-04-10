import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './Tasks.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';

const Tasks: React.FC = observer(() => {
  const clickHandler = () => {};

  const buttonContainerData = {
    clickHandler,
    label: 'View All Tasks',
  };

  return (
    <section className={styles.taskList}>
      <Heading level={6} text="Upcoming Tasks"></Heading>
      {taskStore.tasks.map((task) => (
        <Task key={task.id} taskData={task} />
      ))}
      <ButtonContainer {...buttonContainerData} />
    </section>
  );
});

export default Tasks;

/*
      {/* <ButtonContainer buttonContainerData={buttonContainerData} /> */
//const clickHandler = () => {};

// const buttonContainerData = {
//   clickHandler,
//   label: 'Go To TaskManager',
// };
//import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';*/
