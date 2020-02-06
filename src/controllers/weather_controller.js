class WeatherController {
  constructor(weatherModel, weatherView) {
    this.weatherModel = weatherModel;
    this.weatherView = weatherView;

    this.weatherModel.updateEvent.addListener(this.weatherView.updateListener);
  }

  run() {
    this.weatherModel.get();
  }
}

export default WeatherController;
