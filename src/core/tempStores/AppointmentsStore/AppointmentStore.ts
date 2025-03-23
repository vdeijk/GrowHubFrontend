import { makeAutoObservable } from 'mobx';
import { Appointment } from '../../../auxiliary/interfaces/Appointment';

class AppointmentStore {
  appointments: Appointment[] = [
    {
      time: '09:00 AM',
      title: 'Meeting with Bob',
      description: 'Discuss project updates',
    },
    {
      time: '11:00 AM',
      title: 'Doctor Appointment',
      description: 'Annual check-up',
    },
    {
      time: '01:00 PM',
      title: 'Lunch with Sarah',
      description: 'Catch up over lunch',
    },
    {
      time: '03:00 PM',
      title: 'Team Standup',
      description: 'Daily team meeting',
    },
    { time: '05:00 PM', title: 'Gym', description: 'Workout session' },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

const appointmentStore = new AppointmentStore();
export default appointmentStore;
