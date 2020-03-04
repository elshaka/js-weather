import {
  LOADING, WEATHER, ERROR, UNITS,
} from '../actions';

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case WEATHER:
      return {
        ...state,
        location: action.weather.location,
        today: action.weather.week[0],
        week: action.weather.week,
      };
    case ERROR:
      return {
        ...state,
        location: action.error,
        today: null,
        week: [],
      };
    case UNITS:
      return {
        ...state,
        units: action.units,
      };
    default:
      return state;
  }
};

export default reducer;
