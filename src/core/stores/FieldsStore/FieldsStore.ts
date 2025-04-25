import { makeAutoObservable, runInAction } from 'mobx';
import weatherStore from '../CurrentWeatherStore/WeatherStore';
import { EndpointService } from '../../apis/EndpointService';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';

class FieldsStore {
  private endpointService = new EndpointService('Location');
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
      const data: LocationItem[] | undefined =
        await this.endpointService.getData<LocationItem[]>();

      if (!data) return;

      runInAction(() => {
        this.locations = data;

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
    await this.endpointService.deleteData(id);

    this.fetchData();

    weatherStore.fetchData();
  };
}

const fieldsStore = new FieldsStore();
export default fieldsStore;
