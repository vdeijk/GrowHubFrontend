import { makeAutoObservable, runInAction } from 'mobx';
import weatherStore from '../WeatherStore/WeatherStore';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { FieldItem } from '../../../../api';
import EventBus from '../../../services/EventBusService/EventBusService';
import { TableHeaderModel } from '../../../../auxiliary/interfaces/TableHeaderModel';
import FieldsData from '../../../../auxiliary/data/FieldsData';

class FieldsStore {
  private endpointService = new EndpointService('Field');
  public locations: FieldItem[] = [];
  public get isLoading(): boolean {
    return this.endpointService.isLoading;
  }
  public get tableHeaders(): TableHeaderModel<FieldItem>[] {
    return FieldsData.tableHeaders;
  }

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }

  public async fetchData() {
    const data: FieldItem[] | undefined =
      await this.endpointService.getData<FieldItem[]>();

    if (!data) return;

    runInAction(() => {
      this.locations = data;

      weatherStore.setLocation(this.locations[0]?.id?.toString() || '');
      weatherStore.fetchData();
    });

    EventBus.dispatchEvent('locations:updated', undefined);
  }

  public deleteField = async (id: string) => {
    await this.endpointService.deleteData(id);

    this.fetchData();

    weatherStore.fetchData();
  };

  public getLocations(): FieldItem[] {
    return this.locations;
  }
}

const fieldsStore = new FieldsStore();
export default fieldsStore;
