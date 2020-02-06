import Weather from './models/weather';
import WeatherView from './views/weather_view';
import WeatherController from './controllers/weather_controller';

const weather = new Weather('Dolartoday');
const weatherView = new WeatherView;
const app = new WeatherController(weather, weatherView);

app.run();
