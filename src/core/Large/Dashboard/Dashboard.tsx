import React from "react";
import CurrentWeather from "../../Medium/CurrentWeather/CurrentWeather";
import Tasks from "../../Medium/Tasks/Tasks";
import styles from "./Dashboard.module.css";
import TurnoverGraph from "../../Medium/TurnoverGraph/TurnoverGraph";
import turnoverStore from "../../Stores/TurnoverStore";
import Appointments from "../../Medium/Appointments/Appointments";
import Plants from "../../Medium/Plants/Plants";
import UpcomingWeather from "../../Medium/UpcomingWeather/UpcomingWeather";

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
