import '../assets/css/weather.scss';
import { format } from 'date-fns';
import spinner from '../assets/images/spinner.gif';
import Event from '../models/event';

class WeatherView {
  constructor(target) {
    this.init(document.querySelector(target));
    this.reset();

    this.weatherUpdateListener = (data) => {
      this.locationName.innerHTML = data.city;
      this.bigIcon.src = WeatherView.getIconImgSrc(data.days[0].icon);
      this.temp.innerHTML = `${WeatherView.kToC(data.days[0].temp)}°`;
      this.description.innerHTML = data.days[0].description;
      this.days.forEach((day, index) => {
        day.name.innerHTML = format(data.days[index].date, 'EEE');
        day.icon.src = WeatherView.getIconImgSrc(data.days[index].icon);
        day.tempMax.innerHTML = `${WeatherView.kToC(data.days[index].tempMax)}°`;
        day.tempMin.innerHTML = `${WeatherView.kToC(data.days[index].tempMin)}°`;
      });
    };

    this.locationNotFoundListener = () => {
      this.locationName.innerHTML = 'Location not found';
    };

    this.networkErrorListener = () => {
      this.locationName.innerHTML = 'Network error, please try again later.';
    };

    this.locationChangeEvent = new Event(this);

    this.search.addEventListener('click', () => {
      const location = this.locationInput.value.trim().toLowerCase();
      if (location) {
        this.reset();
        this.locationChangeEvent.notify(location);
      }
    });

    this.locationInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.search.click();
      }
    });
  }

  init(targetNode) {
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
    this.temp = document.createElement('span');
    this.temp.className = 'temp';
    this.description = document.createElement('span');
    this.description.className = 'description';
    weather.appendChild(this.temp);
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
  }

  reset() {
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

  static getIconImgSrc(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  static kToC(k) {
    return Math.round(k - 273.15);
  }
}

export default WeatherView;
