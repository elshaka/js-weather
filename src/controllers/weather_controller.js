import Weather from '../models/weather';
import WeatherView from '../views/weather_view';

class WeatherController {
  constructor(target, apiID) {
    this.weather = new Weather(apiID);
    this.weatherView = new WeatherView(target);
    this.weatherView.locationChangeEvent.addListener(this.weather.locationChangeListener);
    this.weather.weatherUpdateEvent.addListener(this.weatherView.weatherUpdateListener);
    this.weather.locationNotFoundEvent.addListener(this.weatherView.locationNotFoundListener);
    this.weather.networkErrorEvent.addListener(this.weatherView.networkErrorListener);
  }

  run() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weather.get({
          type: 'latlon',
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }
}

export default WeatherController;
