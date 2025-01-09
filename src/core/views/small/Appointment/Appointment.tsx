import React from 'react';
import styles from './Appointment.module.css';

interface AppointmentProps {
  appointmentData: {
    time: string;
    title: string;
    description: string;
  };
}

const Appointment: React.FC<AppointmentProps> = ({ appointmentData }) => {
  return (
    <div className={styles.appointment}>
      <div className={styles.time}>{appointmentData.time}</div>
      <div className={styles.details}>
        <h4 className={styles.title}>{appointmentData.title}</h4>
        <p className={styles.description}>{appointmentData.description}</p>
      </div>
    </div>
  );
};

export default Appointment;
