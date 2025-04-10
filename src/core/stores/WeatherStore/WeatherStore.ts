import { makeAutoObservable } from 'mobx';
import { runInAction } from 'mobx';
import { WeatherData } from '../../../auxiliary/interfaces/WeatherData';
import { getWeatherData } from '../../apis/weather';
import { getData } from '../../apis/getData';

class WeatherStore {
  weather: WeatherData | null = null;
  city = 'The Hague';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this.fetchData();
  }


  private async fetchData() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const weather = await getData('/Weather/current', { city: "The Hague" });

      runInAction(() => {
        this.weather = weather;

        console.log(this.weather);
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async fetchWeather() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const weather = await getWeatherData(this.city);
      runInAction(() => {
        this.weather = weather;
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
