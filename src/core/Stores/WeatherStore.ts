import { makeAutoObservable } from 'mobx';
import { runInAction } from 'mobx';
import { WeatherData } from '../../auxiliary/interfaces/WeatherData';
import { getWeatherData } from '../apis/weather';

class WeatherStore {
  weather: WeatherData | null = null;
  city = 'The Hague';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchWeather() {
    try {
      const weather = await getWeatherData(this.city);
      runInAction(() => {
        this.weather = weather;
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
