import { WeatherForecast } from '../interfaces/WeatherForecast';

const weatherMock: WeatherForecast = {
  forecastday: [
    {
      date: '2025-04-11',
      day: {
        avgtemp_c: 15,
        maxtemp_c: 18,
        mintemp_c: 12,
        daily_chance_of_rain: 20,
        condition: {
          text: 'Partly Cloudy',
          icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
        },
      },
    },
    {
      date: '2025-04-12',
      day: {
        avgtemp_c: 17,
        maxtemp_c: 20,
        mintemp_c: 14,
        daily_chance_of_rain: 10,
        condition: {
          text: 'Sunny',
          icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
        },
      },
    },
    {
      date: '2025-04-13',
      day: {
        avgtemp_c: 14,
        maxtemp_c: 16,
        mintemp_c: 11,
        daily_chance_of_rain: 50,
        condition: {
          text: 'Rainy',
          icon: 'https://cdn.weatherapi.com/weather/64x64/day/296.png',
        },
      },
    },
    {
      date: '2025-04-14',
      day: {
        avgtemp_c: 13,
        maxtemp_c: 15,
        mintemp_c: 10,
        daily_chance_of_rain: 70,
        condition: {
          text: 'Showers',
          icon: 'https://cdn.weatherapi.com/weather/64x64/day/308.png',
        },
      },
    },
    {
      date: '2025-04-15',
      day: {
        avgtemp_c: 16,
        maxtemp_c: 19,
        mintemp_c: 13,
        daily_chance_of_rain: 30,
        condition: {
          text: 'Cloudy',
          icon: 'https://cdn.weatherapi.com/weather/64x64/day/119.png',
        },
      },
    },
    {
      date: '2025-04-16',
      day: {
        avgtemp_c: 18,
        maxtemp_c: 21,
        mintemp_c: 15,
        daily_chance_of_rain: 5,
        condition: {
          text: 'Sunny',
          icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
        },
      },
    },
    {
      date: '2025-04-17',
      day: {
        avgtemp_c: 19,
        maxtemp_c: 22,
        mintemp_c: 16,
        daily_chance_of_rain: 0,
        condition: {
          text: 'Clear',
          icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
        },
      },
    },
  ],
};

export default weatherMock;
