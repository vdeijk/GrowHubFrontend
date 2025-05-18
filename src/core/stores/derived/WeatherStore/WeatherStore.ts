import { makeAutoObservable } from 'mobx';
import { runInAction } from 'mobx';
import fieldsStore from '../FieldsStore/FieldsStore';
import { FieldItem } from '../../../../api';
import FormatService from '../../../services/FormatService/FormatService';
import { EndpointService } from '../../../services/EndpointService/EndpointService';
import { Weather } from '../../../../auxiliary/interfaces/Weather';
import i18next from 'i18next';

class WeatherStore {
  private endpointService = new EndpointService('Weather/forecast');
  weatherData: Weather | null = null;
  isLoading = false;
  selectedLocation: FieldItem | null | undefined = null;
  locationFullName: string = '';

  constructor() {
    makeAutoObservable(this);

    i18next.on('languageChanged', () => {
      this.updateLocationFullName();
    });
  }

  public async fetchData() {
    const coordinates = this.getLocationCoordinates();

    if (!coordinates) return;

    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const data: Weather | undefined = await this.endpointService.getData(
        undefined,
        {
          city: coordinates,
          days: 3,
        },
      );

      if (!data) return;

      runInAction(() => {
        this.weatherData = data;
        this.locationFullName = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public setLocation(id: string) {
    const location = fieldsStore.locations.find((loc) => loc.id === String(id));
    if (location) {
      this.selectedLocation = location;

      this.fetchData();
    } else {
      console.error('Location not found');
    }
  }

  public getLocationCoordinates(): string {
    const location = fieldsStore?.locations?.find(
      (loc) => loc.id === this.selectedLocation?.id,
    );

    if (!location) {
      return '';
    }

    const latitude =
      location.latitude !== undefined
        ? FormatService.formatCoordinate(location.latitude)
        : '';
    const longitude =
      location.longitude !== undefined
        ? FormatService.formatCoordinate(location.longitude)
        : '';

    return `${latitude},${longitude}`;
  }

  private updateLocationFullName() {
    if (this.weatherData) {
      const { name, region, country } = this.weatherData.location;
      this.locationFullName = `${name}, ${region}, ${country}`;
    } else {
      this.locationFullName = i18next.t('weatherReportPage.unknownLocation');
    }
  }

  get selectedLocationName(): string {
    return this.selectedLocation
      ? (this.selectedLocation.name ??
          i18next.t('weatherReportPage.unknownLocation'))
      : i18next.t('weatherReportPage.unknownLocation');
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
