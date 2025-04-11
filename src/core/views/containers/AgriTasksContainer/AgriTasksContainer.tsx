import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './AgriTasksContainer.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import { useNavigate } from 'react-router-dom';

const Tasks: React.FC = observer(() => {
  const navigate = useNavigate();

  const buttonContainerData = {
    clickHandler: () => navigate('/taskPage'),
    label: 'View All AgriTasks',
  };

  return (
    <section className={styles.taskList}>
      <Heading level={6} text="AgriTasks"></Heading>
      {taskStore.tasks.map((task) => (
        <Task key={task.id} taskData={task} />
      ))}
      <ButtonContainer {...buttonContainerData} />
    </section>
  );
});

export default Tasks;
