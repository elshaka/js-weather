import Event from './event';

class Weather {
  constructor(location) {
    this.location = location;
    this.updateEvent = new Event(this);
  }

  get() {
    fetch('https://s3.amazonaws.com/dolartoday/data.json', { mode: 'cors' })
      .then(response => response.json())
      .then(data => { this.updateEvent.notify(data.USD.dolartoday); });
  }

  changeLocation(location) {
    this.location = location;
    this.get();
  }
}

export default Weather;
