import React from "react";
import CurrentWeather from "../../medium/CurrentWeather/CurrentWeather";
import Tasks from "../../medium/Tasks/Tasks";
import styles from "./Dashboard.module.css";
import TurnoverGraph from "../../medium/TurnoverGraph/TurnoverGraph";
import turnoverStore from "../../../stores/TurnoverStore";
import Appointments from "../../medium/Appointments/Appointments";
import Plants from "../../medium/Plants/Plants";
import UpcomingWeather from "../../medium/UpcomingWeather/UpcomingWeather";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <CurrentWeather />
      <UpcomingWeather />
      <Tasks />
      <Appointments />
      <TurnoverGraph data={turnoverStore.turnovers} width={500} height={300} />
      <Plants />
    </div>
  );
};

export default Dashboard;
