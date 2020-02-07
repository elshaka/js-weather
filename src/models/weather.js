import Event from './event';

class Weather {
  constructor(apiID) {
    this.apiID = apiID;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    this.weatherUpdateEvent = new Event(this);
    this.locationNotFoundEvent = new Event(this);
    this.networkErrorEvent = new Event(this);

    this.locationChangeListener = (location) => { this.get(location); };
  }

  get(location) {
    const cache = Weather.getCache(location);
    if (cache) {
      this.weatherUpdateEvent.notify(Weather.formatData(cache));
    } else {
      const requestUrl = `${this.baseUrl}${location}&APPID=${this.apiID}`;
      const fetchPromise = fetch(requestUrl, { mode: 'cors' });
      fetchPromise.then(response => response.json())
        .then(data => {
          if (data.cod === '200') {
            Weather.setCache(location, data);
            this.weatherUpdateEvent.notify(Weather.formatData(data));
          } else {
            this.locationNotFoundEvent.notify(data);
          }
        });
      fetchPromise.catch(error => { this.networkErrorEvent.notify(error); });
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

    return { city, days };
  }
}

export default Weather;
