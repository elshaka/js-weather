class WeatherController {
  constructor(weatherModel, weatherView) {
    this.weatherModel = weatherModel;
    this.weatherView = weatherView;
    this.weatherModel.updated.addListener(this.weatherView.update);
  }

  run() {
    this.weatherView.render();
    this.weatherModel.get();
  }
}

export default WeatherController;
