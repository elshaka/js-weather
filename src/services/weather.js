import axios from 'axios';

const weather = (() => {
  const apiID = '048840c1ca326e3a3e053c5eb9ded3f3';
  const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';

  const getLocationQuery = location => {
    switch (location.type) {
      case 'latlon':
        return `lat=${location.lat}&lon=${location.lon}`;
      default:
        return `q=${location}`;
    }
  };

  const get = location => {
    const locationQuery = getLocationQuery(location);
    const requestUrl = `${baseUrl}${locationQuery}&APPID=${apiID}`;
    return axios.get(requestUrl, { mode: 'cors' });
  };

  return { get };
})();

export default weather;
