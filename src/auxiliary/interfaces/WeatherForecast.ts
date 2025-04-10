export interface WeatherForecast {
  forecastday: {
    date: string;
    day: {
      avgtemp_c: number;
      maxtemp_c: number;
      mintemp_c: number;
      daily_chance_of_rain: number;
      condition: {
        text: string;
        icon: string;
      };
    };
  }[];
}
