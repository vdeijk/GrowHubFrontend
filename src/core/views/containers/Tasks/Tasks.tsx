import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/TaskStore';
import styles from './Tasks.module.css';
import { observer } from 'mobx-react-lite';
//import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import Heading from '../../reusables/Heading/Heading';

const Tasks: React.FC = observer(() => {
  //const clickHandler = () => {};

  // const buttonContainerData = {
  //   clickHandler,
  //   label: 'Go To TaskManager',
  // };

  return (
    <section className={styles.taskList}>
      <Heading level={6} text="Upcoming Tasks"></Heading>
      {taskStore.tasks.map((task) => (
        <Task key={task.id} taskData={task} />
      ))}
      {/* <ButtonContainer buttonContainerData={buttonContainerData} /> */}
    </section>
  );
});

export default Tasks;
