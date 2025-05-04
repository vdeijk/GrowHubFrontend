import React from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/derived/TasksStore/TasksStore';
import styles from './TasksContainer.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import useRouterNavigation from '../../../../auxiliary/hooks/useRouterNavigation';
import LoadingWrapper from '../../reusables/LoadingWrapper/LoadingWrapper';
import { ButtonProps } from '../../../../auxiliary/interfaces/ButtonProps';

const TasksContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => navigate('/tasksPage'),
      label: 'View All Tasks',
    },
  ];

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={taskStore.isLoading}>
        <Heading
          level={6}
          text="Tasks"
          customStyles={{ marginBottom: '2rem' }}
        ></Heading>
        {taskStore.items.slice(0, 3).map((task) => (
          <Task key={task.id} taskData={task} />
        ))}
        <ButtonContainer buttons={buttonContainerData} />
      </LoadingWrapper>
    </section>
  );
});

export default TasksContainer;
