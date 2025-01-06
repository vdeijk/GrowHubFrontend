import React from "react";
import { observer } from "mobx-react-lite";
import Appointment from "../../Small/Appointment/Appointment";
import appointmentStore from "../../Stores/AppointmentStore";
import styles from "./Appointments.module.css";
import Button from "../../Small/Button/Button";

const Appointments: React.FC = observer(() => {
  const clickHandler = () => {};

  return (
    <div className={styles.appointmentList}>
      <div>
        <h6 className={styles.h6}>Today's Appointments</h6>
        {appointmentStore.appointments.map((appointment, index) => (
          <Appointment key={index} appointment={appointment} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={clickHandler}>Go To Calendar</Button>
      </div>
    </div>
  );
});

export default Appointments;
