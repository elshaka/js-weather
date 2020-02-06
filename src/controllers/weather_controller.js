import Weather from '../models/weather';
import WeatherView from '../views/weather_view';

class WeatherController {
  constructor(target, apiID) {
    this.weather = new Weather(apiID);
    this.weatherView = new WeatherView(target);
    this.weatherView.locationChangeEvent.addListener(this.weather.locationChangeListener);
    this.weather.updateEvent.addListener(this.weatherView.updateListener);
  }

  run(location) {
    this.weather.get(location);
  }
}

export default WeatherController;
