import { makeAutoObservable, runInAction } from 'mobx';
import { Appointment } from '../../../auxiliary/interfaces/Appointment';
import { getData } from '../../apis/getData';

class AppointmentStore {
  appointments: Appointment[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  async fetchData() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const appointments = await getData('/Appointment');
      runInAction(() => {
        this.appointments = appointments;
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const appointmentStore = new AppointmentStore();
export default appointmentStore;
