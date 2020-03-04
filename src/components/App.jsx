import React, { useReducer, useEffect } from 'react';
import Search from './Search';
import Loading from './Loading';
import Today from './Today';
import Week from './Week';
import reducer from '../reducers';
import { fetchBrowserLocation, fetchLocation, changeUnits } from '../actions';
import { CELCIUS } from '../utils/converter';

export const initialState = {
  loading: false,
  location: null,
  units: CELCIUS,
  today: null,
  week: [],
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getWeather = (location) => {
    fetchLocation(location, dispatch);
  };

  const setUnits = (units) => {
    dispatch(changeUnits(units));
  }

  useEffect(() => {
    fetchBrowserLocation(dispatch);
  }, []);

  return (
    <div className="weather-widget">
      <Search getWeather={ getWeather } />
      <div className="content">
        { state.loading && <Loading /> }
        { !state.loading &&
          <>
            <Today locationHeader={ state.location } today={ state.today } units={ state.units } setUnits={ setUnits } />
            <Week week={ state.week } units={ state.units } />
          </>
        }
      </div>
      <div className="footer">Powered by <a href="https://openweathermap.org/">OpenWeather</a></div>
    </div>
  );
}

export default App;
