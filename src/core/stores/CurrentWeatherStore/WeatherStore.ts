import { makeAutoObservable, toJS } from 'mobx';
import { runInAction } from 'mobx';
import { WeatherData } from '../../../auxiliary/interfaces/WeatherData';
import { getData } from '../../apis/getData';
//import { WeatherForecast } from '../../../auxiliary/interfaces/WeatherForecast';
import fieldsStore from '../FieldsStore/FieldsStore';
import { LocationItem } from '../../../auxiliary/interfaces/LocationItem';
import { formatCoordinate } from '../../../auxiliary/utils/formatCoordinates';

class WeatherStore {
  currentWeather: WeatherData | null = null;
  isLoading = false;
  weatherForecast: any[] | null = null;
  selectedLocation: LocationItem | null | undefined = null;
  locationFullName: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  public async fetchData() {
    const coordinates = this.getLocationCoordinates();

    if (!coordinates) return;

    try {
      runInAction(() => {
        this.isLoading = true;
      });

      const weather = await getData('/Weather/forecast', {
        city: coordinates,
        days: 3,
      });

      runInAction(() => {
        this.currentWeather = weather.current;
        this.weatherForecast = weather.forecast.forecastday;
        this.locationFullName = `${weather.location.name}, ${weather.location.region}, ${weather.location.country}`;
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
    const location = fieldsStore.locations.find((loc) => loc.id === Number(id));
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

    const latitude = formatCoordinate(location.latitude);
    const longitude = formatCoordinate(location.longitude);

    return `${latitude},${longitude}`;
  }

  get selectedLocationName(): string {
    return this.selectedLocation
      ? this.selectedLocation.name
      : 'Unknown Location';
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
