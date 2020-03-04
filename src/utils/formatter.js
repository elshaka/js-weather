import { format } from 'date-fns';

const formatWeather = data => {
  const location = `${data.city.name}, ${data.city.country}`;
  const week = Array(5).fill().map((_, index) => {
    const item = data.list[index * 8];
    const tempMin = Math.min(...data.list.slice(index * 8, (index + 1) * 8)
      .map(i => i.main.temp_min));
    const tempMax = Math.max(...data.list.slice(index * 8, (index + 1) * 8)
      .map(i => i.main.temp_max));
    return {
      date: format(new Date(item.dt_txt.replace(/-/g, '/')), 'EEE'),
      temp: item.main.temp,
      tempMin,
      tempMax,
      description: item.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    };
  });

  return { location, week };
};

export default formatWeather;
