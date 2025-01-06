import React from "react";
import Task from "../../Small/Task/Task";
import taskStore from "../../Stores/TaskStore";
import styles from "./Tasks.module.css";
import { observer } from "mobx-react-lite";
import Button from "../../Small/Button/Button";

const Tasks: React.FC = observer(() => {
  const clickHandler = () => {};

  return (
    <div className={styles.taskList}>
      <h6 className={styles.h6}>Upcoming Tasks</h6>
      {taskStore.tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={() => taskStore.toggleComplete(task.id)}
        />
      ))}
      <div className={styles.buttonContainer}>
        <Button onClick={clickHandler}>Go To TaskManager</Button>
      </div>
    </div>
  );
});

export default Tasks;
