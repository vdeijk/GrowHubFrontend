import { makeAutoObservable, runInAction } from 'mobx';
import { getData } from '../../apis/getData';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import { deleteData } from '../../apis/deleteData';
import weatherStore from '../CurrentWeatherStore/WeatherStore';

class FieldsStore {
  locations: LocationItem[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  public async fetchData() {
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const locations = await getData('/Location');
      runInAction(() => {
        this.locations = locations;

        weatherStore.setLocation(this.locations[0]?.id?.toString() || '');
        weatherStore.fetchData();
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public deleteField = async (id: number) => {
    await deleteData(`/location/${id}`, id);

    this.fetchData();

    weatherStore.fetchData();
  };
}

const fieldsStore = new FieldsStore();
export default fieldsStore;
