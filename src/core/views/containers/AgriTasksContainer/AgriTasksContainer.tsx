import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/derived/TasksStore/TasksStore';
import styles from './AgriTasksContainer.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';

const Tasks: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData = {
    clickHandler: () => navigate('/tasksPage'),
    label: 'View All AgriTasks',
  };

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={taskStore.isLoading}>
        <Heading
          level={6}
          text="AgriTasks"
          customStyles={{ marginBottom: '2rem' }}
        ></Heading>
        {taskStore.items.slice(0, 3).map((task) => (
          <Task key={task.id} taskData={task} />
        ))}
        <ButtonContainer buttons={[buttonContainerData]} />
      </LoadingWrapper>
    </section>
  );
});

export default Tasks;
