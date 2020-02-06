import Event from './event';

class Weather {
  constructor(location) {
    this.location = location;
    this.updated = new Event(this);
  }

  get() {
    fetch('https://s3.amazonaws.com/dolartoday/data.json', { mode: 'cors' })
      .then(response => response.json())
      .then(data => { this.updated.notify(data['USD']['dolartoday']); });
  }

  changeLocation(location) {
    this.location = location;
    this.get();
  }
}

export default Weather;
