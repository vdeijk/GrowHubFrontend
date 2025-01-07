import React from "react";
import { observer } from "mobx-react-lite";
import Appointment from "../../small/Appointment/Appointment";
import appointmentStore from "../../../stores/AppointmentStore";
import styles from "./Appointments.module.css";
import ButtonContainer from "../../small/ButtonContainer/ButtonContainer";

const Appointments: React.FC = observer(() => {
  const clickHandler = () => {};

  const buttonContainerProps = {
    clickHandler,
    label: "Go To Calendar",
  };

  return (
    <div className={styles.appointmentList}>
      <div>
        <h6 className={styles.h6}>Today's Appointments</h6>
        {appointmentStore.appointments.map((appointment, index) => (
          <Appointment key={index} appointment={appointment} />
        ))}
      </div>
      <ButtonContainer buttonContainerProps={buttonContainerProps} />
    </div>
  );
});

export default Appointments;
