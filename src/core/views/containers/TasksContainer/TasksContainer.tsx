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
import { useTranslation } from 'react-i18next';

const TasksContainer: React.FC = observer(() => {
  const navigate = useRouterNavigation();
  const { t } = useTranslation();

  const buttonContainerData: ButtonProps[] = [
    {
      onClick: () => navigate('/tasksPage'),
      label: t('tasksContainer.viewAllTasks'),
    },
  ];

  return (
    <section className={styles.section}>
      <LoadingWrapper isLoading={taskStore.isLoading}>
        <Heading level={6} customStyles={{ marginBottom: '2rem' }}>
          {t('tasksContainer.heading')}
        </Heading>
        {taskStore.items.slice(0, 3).map((task) => (
          <Task key={task.id} taskData={task} />
        ))}
        <ButtonContainer buttons={buttonContainerData} />
      </LoadingWrapper>
    </section>
  );
});

export default TasksContainer;
