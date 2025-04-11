import React from 'react';
import { observer } from 'mobx-react-lite';
import Appointment from '../../reusables/Appointment/Appointment';
import appointmentStore from '../../../stores/AppointmentsStore/AppointmentStore';
import styles from './AppointmentsContainer.module.css';
//import ButtonContainer from '../../reusables/ButtonContainer/ButtonContainer';
import Heading from '../../reusables/Heading/Heading';

const Appointments: React.FC = observer(() => {
  // const clickHandler = () => {};

  // const buttonContainerData = {
  //   clickHandler,
  //   label: 'Go To Calendar',
  // };

  return (
    <section className={styles.appointmentList}>
      <div>
        <Heading level={6} text="Today's Appointments"></Heading>
        {appointmentStore.appointments.map((appointment, index) => (
          <Appointment key={index} appointmentData={appointment} />
        ))}
      </div>
      {/* <ButtonContainer buttonContainerData={buttonContainerData} />*/}
    </section>
  );
});

export default Appointments;
