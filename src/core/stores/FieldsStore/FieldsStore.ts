import { makeAutoObservable, runInAction } from 'mobx';
import weatherStore from '../CurrentWeatherStore/WeatherStore';
import { EndpointService } from '../../services/EndpointService';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import EventBus from '../../services/EventBusService';

class FieldsStore {
  private endpointService = new EndpointService('Location');
  public locations: LocationItem[] = [];
  public centerMapTrigger = false;
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  public async fetchData() {
    const data: LocationItem[] | undefined =
      await this.endpointService.getData<LocationItem[]>();

    if (!data) return;

    runInAction(() => {
      this.locations = data;

      weatherStore.setLocation(this.locations[0]?.id?.toString() || '');
      weatherStore.fetchData();

      EventBus.dispatchEvent('locations:updated', undefined);
    });
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
