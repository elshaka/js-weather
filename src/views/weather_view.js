import '../assets/css/weather.scss';
/* eslint-disable import/no-unresolved */
import { format } from 'date-fns';
/* eslint-enable import/no-unresolved */
import spinner from '../assets/images/spinner.gif';
import Event from '../models/event';

class WeatherView {
  constructor(target) {
    this.initUI(document.querySelector(target));
    this.initEvents();
    this.initListeners();
    this.setUnits('c');
  }

  initUI(targetNode) {
    const weatherWidget = document.createElement('div');
    weatherWidget.className = 'weather-widget';

    const header = document.createElement('div');
    header.className = 'header';
    this.locationInput = document.createElement('input');
    this.locationInput.placeholder = 'Enter a city name';
    this.search = document.createElement('button');
    this.search.innerHTML = 'Search';
    header.appendChild(this.locationInput);
    header.appendChild(this.search);

    const content = document.createElement('div');
    content.className = 'content';

    this.locationName = document.createElement('h2');
    content.appendChild(this.locationName);

    const today = document.createElement('div');
    today.className = 'today';
    this.bigIcon = document.createElement('img');
    this.bigIcon.className = 'big-icon';
    const weather = document.createElement('div');
    weather.className = 'weather';

    const tempContainer = document.createElement('div');
    tempContainer.className = 'temp-container';
    this.temp = document.createElement('span');
    this.temp.className = 'temp';
    this.unitsContainer = document.createElement('div');
    this.unitsContainer.className = 'units-container';
    this.celcius = document.createElement('a');
    this.celcius.id = 'c';
    this.celcius.innerHTML = 'C';
    this.fahrenheit = document.createElement('a');
    this.fahrenheit.id = 'f';
    this.fahrenheit.innerHTML = 'F';
    this.unitsContainer.appendChild(this.celcius);
    this.unitsContainer.appendChild(this.fahrenheit);
    tempContainer.appendChild(this.temp);
    tempContainer.appendChild(this.unitsContainer);

    this.description = document.createElement('span');
    this.description.className = 'description';
    weather.appendChild(tempContainer);
    weather.appendChild(this.description);
    today.appendChild(this.bigIcon);
    today.appendChild(weather);
    content.appendChild(today);

    const week = document.createElement('div');
    week.className = 'week';
    this.days = Array(5).fill().map(() => {
      const day = document.createElement('div');
      day.className = 'day';
      const name = document.createElement('span');
      name.className = 'name';
      const icon = document.createElement('img');
      icon.className = 'icon';
      const tempMax = document.createElement('span');
      tempMax.className = 'max-temp';
      const tempMin = document.createElement('span');
      tempMin.className = 'min-temp';
      day.appendChild(name);
      day.appendChild(icon);
      day.appendChild(tempMax);
      day.appendChild(tempMin);
      week.appendChild(day);

      return {
        name, icon, tempMax, tempMin,
      };
    });
    content.appendChild(week);

    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.innerHTML = 'Powered by <a href="https://openweathermap.org/">OpenWeather</a>';

    weatherWidget.appendChild(header);
    weatherWidget.appendChild(content);
    weatherWidget.appendChild(footer);
    targetNode.appendChild(weatherWidget);

    this.clearUI();
  }

  clearUI() {
    this.locationName.innerHTML = '...';
    this.bigIcon.src = spinner;
    this.temp.innerHTML = '-°';
    this.description.innerHTML = '...';
    this.days.forEach(day => {
      day.name.innerHTML = '...';
      day.icon.src = spinner;
      day.tempMax.innerHTML = '-°';
      day.tempMin.innerHTML = '-°';
    });
  }

  initEvents() {
    this.locationChangeEvent = new Event(this);
    this.search.addEventListener('click', () => {
      const location = this.locationInput.value.trim().toLowerCase();
      if (location) {
        this.clearUI();
        this.locationChangeEvent.notify(location);
      }
    });
    this.locationInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.search.click();
      }
    });

    this.celcius.addEventListener('click', () => { this.setUnits('c'); });
    this.fahrenheit.addEventListener('click', () => { this.setUnits('f'); });
  }

  initListeners() {
    this.weatherUpdateListener = (data) => {
      this.locationName.innerHTML = data.city;
      this.bigIcon.src = WeatherView.getIconImgSrc(data.days[0].icon);
      this.temp.innerHTML = `${this.convertTemp(data.days[0].temp)}°`;
      this.temp.dataset.value = data.days[0].temp;
      this.description.innerHTML = data.days[0].description;
      this.days.forEach((day, index) => {
        day.name.innerHTML = format(data.days[index].date, 'EEE');
        day.icon.src = WeatherView.getIconImgSrc(data.days[index].icon);
        day.tempMax.innerHTML = `${this.convertTemp(data.days[index].tempMax)}°`;
        day.tempMax.dataset.value = data.days[index].tempMax;
        day.tempMin.innerHTML = `${this.convertTemp(data.days[index].tempMin)}°`;
        day.tempMin.dataset.value = data.days[index].tempMin;
      });
    };

    this.locationNotFoundListener = () => {
      this.locationName.innerHTML = 'Location not found';
    };

    this.networkErrorListener = () => {
      this.locationName.innerHTML = 'Network error, please try again later.';
    };
  }

  setUnits(units) {
    this.units = units;
    this.unitsContainer.childNodes.forEach(a => {
      a.className = (a.id === units) ? 'checked' : 'unchecked';
    });

    if (!Number.isNaN(Number(this.temp.dataset.value))) {
      this.temp.innerHTML = `${this.convertTemp(this.temp.dataset.value)}°`;
      this.days.forEach((day) => {
        day.tempMax.innerHTML = `${this.convertTemp(day.tempMax.dataset.value)}°`;
        day.tempMin.innerHTML = `${this.convertTemp(day.tempMin.dataset.value)}°`;
      });
    }
  }

  convertTemp(temp) {
    return this.units === 'c' ? WeatherView.kToC(temp) : WeatherView.kToF(temp);
  }

  static getIconImgSrc(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  static kToC(k) {
    return Math.round(k - 273.15);
  }

  static kToF(k) {
    return Math.round(k * (9 / 5) - 459.67);
  }
}

export default WeatherView;
