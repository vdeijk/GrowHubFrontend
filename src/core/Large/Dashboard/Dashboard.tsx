import React from "react";
import Weather from "../../Medium/Weather/Weather";
import TaskList from "../../Medium/TaskList/TaskList";
import styles from "./Dashboard.module.css";
import Graph from "../../Medium/Graph/Graph";
import turnoverStore from "../../Stores/TurnoverStore";
import AppointmentList from "../../Medium/AppointmentList/AppointmentList";
import Plants from "../../Medium/Plants/Plants";
import UpcomingWeather from "../../Medium/UpcomingWeather/UpcomingWeather";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Weather />
      <UpcomingWeather />
      <TaskList />
      <AppointmentList />
      <Graph data={turnoverStore.turnovers} width={500} height={300} />
      <Plants />
    </div>
  );
};

export default Dashboard;
