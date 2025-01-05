import React from 'react';
import { observer } from 'mobx-react-lite';
import Appointment from '../../Small/Appointment/Appointment';
import appointmentStore from '../../Stores/AppointmentStore';
import styles from './AppointmentList.module.css';

const AppointmentList: React.FC = observer(() => {
  return (
    <div className={styles.appointmentList}>
      <h6 className={styles.appointmentList__h6}>Today's Appointments</h6>
      {appointmentStore.appointments.map((appointment, index) => (
        <Appointment key={index} appointment={appointment} />
      ))}
    </div>
  );
});

export default AppointmentList;