import './assets/css/main.scss';
import WeatherController from './controllers/weather_controller';

const app = new WeatherController('#weather', '048840c1ca326e3a3e053c5eb9ded3f3');

app.run();
