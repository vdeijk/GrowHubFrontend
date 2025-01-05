import React from 'react';
import styles from './Appointment.module.css';

interface AppointmentProps {
  appointment: {
    time: string;
    title: string;
    description: string;
  };
}

const Appointment: React.FC<AppointmentProps> = ({ appointment }) => {
  return (
    <div className={styles.appointment}>
      <div className={styles.time}>{appointment.time}</div>
      <div className={styles.details}>
        <h3 className={styles.title}>{appointment.title}</h3>
        <p className={styles.description}>{appointment.description}</p>
      </div>
    </div>
  );
};

export default Appointment;