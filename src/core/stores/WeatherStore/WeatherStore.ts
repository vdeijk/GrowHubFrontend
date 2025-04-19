import { makeAutoObservable } from 'mobx';
import { runInAction } from 'mobx';
import { WeatherData } from '../../../auxiliary/interfaces/WeatherData';
import { getData } from '../../apis/getData';
import { WeatherForecast } from '../../../auxiliary/interfaces/WeatherForecast';
import weatherMock from '../../../auxiliary/data/weatherMock';

class WeatherStore {
  weather: WeatherData | null = null;
  city = 'The Hague';
  isLoading = false;
  weatherForecast: WeatherForecast | null = null;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
    this.loadMockData();
  }

  private loadMockData() {
    this.weatherForecast = weatherMock;
  }

  public async fetchData() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });

      const weather = await getData('/Weather/current', { city: 'The Hague' });

      runInAction(() => {
        this.weather = weather;

        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
