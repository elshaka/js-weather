import Event from './event';

class Weather {
  constructor(apiID) {
    this.apiID = apiID;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    this.updateEvent = new Event(this);

    this.locationChangeListener = (_, location) => { this.get(location) };
  }

  get(location) {
    const cache = Weather.getCache(location);
    if (cache) {
      this.updateEvent.notify(Weather.formatData(cache));
    } else {
      const requestUrl = `${this.baseUrl}${location}&APPID=${this.apiID}`;
      fetch(requestUrl, { mode: 'cors' })
        .then(response => response.json())
        .then(data => {
          Weather.setCache(location, data);
          this.updateEvent.notify(Weather.formatData(data));
        });
    }
  }

  static getCache(location) {
    return JSON.parse(localStorage.getItem(location));
  }

  static setCache(location, data) {
    localStorage.setItem(location, JSON.stringify(data));
  }

  static formatData(data) {
    const city = `${data.city.name}, ${data.city.country}`;
    const days = Array(5).fill().map((_, index) => {
      const item = data.list[index * 8];
      return {
        date: new Date(item.dt_txt),
        temp: item.main.temp,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    });

    return { city, days }
  }
}

export default Weather;
