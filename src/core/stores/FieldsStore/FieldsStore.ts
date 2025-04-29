import { makeAutoObservable, runInAction } from 'mobx';
import weatherStore from '../CurrentWeatherStore/WeatherStore';
import { EndpointService } from '../../apis/EndpointService';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import EventBus from '../../../auxiliary/utils/EventTarget';

class FieldsStore {
  private endpointService = new EndpointService('Location');
  locations: LocationItem[] = [];
  isLoading = false;
  centerMapTrigger = false;

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

        EventBus.dispatchEvent(new CustomEvent('locations:updated'));
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

  public getLocations(): LocationItem[] {
    return this.locations;
  }
}

const fieldsStore = new FieldsStore();
export default fieldsStore;
