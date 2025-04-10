import React, { useState } from 'react';
import Task from '../../reusables/Task/Task';
import taskStore from '../../../stores/TaskStore/TaskStore';
import styles from './TaskPage.module.css';
import { observer } from 'mobx-react-lite';
import Heading from '../../reusables/Heading/Heading';
import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';

const TaskPage: React.FC = observer(() => {
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track the task being edited
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'low',
    category: 'work',
    completed: false,
    description: '',
  });

  const handleEdit = (id: number) => {
    const task = taskStore.tasks.find((task) => task.id === id);
    if (task) {
      setIsEditing(id);
      setNewTask({
        ...task,
        dueDate: task.dueDate.toISOString().split('T')[0],
      });
    }
  };

  const handleDelete = (id: number) => {
    taskStore.deleteTask(id);
  };

  const handleSave = () => {
    if (isEditing !== null) {
      taskStore.updateTask(isEditing, newTask);
      setIsEditing(null);
    } else {
      taskStore.addTask(newTask);
    }
    setNewTask({
      title: '',
      dueDate: '',
      priority: 'low',
      category: 'work',
      completed: false,
      description: '',
    });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setNewTask({
      title: '',
      dueDate: '',
      priority: 'low',
      category: 'work',
      completed: false,
      description: '',
    });
  };

  const buttonContainerData = {
    clickHandler: () => setIsEditing(null),
    label: 'Add New Task',
  };

  return (
    <section className={styles.taskPage}>
      <Heading level={6} text="Manage Tasks"></Heading>
      {isEditing !== null ? (
        <div className={styles.taskForm}>
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <div className={styles.formActions}>
            <button onClick={handleSave}>
              {isEditing !== null ? 'Save' : 'Add'}
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {taskStore.tasks.map((task) => (
            <div key={task.id} className={styles.taskItem}>
              <Task taskData={task} />
              <div className={styles.taskActions}>
                <button onClick={() => handleEdit(task.id)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))}
          <ButtonContainer {...buttonContainerData} />
        </>
      )}
    </section>
  );
});

export default TaskPage;
