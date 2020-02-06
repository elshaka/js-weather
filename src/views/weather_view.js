class WeatherView {
  constructor() {

  }

  update(weather, response) {
    document.body.innerHTML = weather.location + ': ' + response;
  }

  render() {
    document.body.innerHTML = 'Plz wait...';
  }
}

export default WeatherView;
