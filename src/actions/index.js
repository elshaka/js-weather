import weather from '../services/weather';
import cache from '../utils/cache';
import formatWeather from '../utils/formatter';

export const LOADING = 'LOADING';
export const WEATHER = 'WEATHER';
export const ERROR = 'ERROR';
export const UNITS = 'UNITS';

const setLoading = loading => ({ type: LOADING, loading });
const setWeather = weather => ({ type: WEATHER, weather });
const setError = error => ({ type: ERROR, error });

export const fetchLocation = (location, dispatch) => {
  const cachedWeather = cache.get(location);
  if (cachedWeather) {
    dispatch(setWeather(formatWeather(cachedWeather)));
  } else {
    dispatch(setLoading(true));
    weather
      .get(location)
      .then(response => {
        const weather = response.data;
        cache.set(location, weather);
        dispatch(setWeather(formatWeather(weather)));
      })
      .catch(e => {
        if (e.response.status === 404) {
          dispatch(setError('Location not found'));
        } else {
          dispatch(setError('Network error, please try again later'));
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
};

export const fetchBrowserLocation = dispatch => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      fetchLocation({
        type: 'latlon',
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }, dispatch);
    });
  }
};

export const changeUnits = units => ({ type: UNITS, units });
