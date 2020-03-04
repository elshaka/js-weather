import React from 'react';
import { convert, CELCIUS, FAHRENHEIT } from '../utils/converter';

const Unit = ({ label, unit, currentUnits, setUnits }) => {
  const onClick = () => {
    setUnits(unit);
  }
  return <a className={ unit === currentUnits ? "checked" : null } onClick={ onClick }>{ label }</a>
};

const Today = ({ locationHeader, today, units, setUnits }) => {
  return (
    <>
      { !!locationHeader && <h2>{ locationHeader }</h2> }
      { !!today &&
        <div className="today">
          <img className="big-icon" src={ today.icon } />
          <div className="weather">
            <div className="temp-container">
              <span className="temp">{ convert(today.temp, units) }°</span>
              <div className="units-container">
                <Unit label="C" unit={ CELCIUS } currentUnits={ units } setUnits={ setUnits }/>
                <Unit label="F" unit={ FAHRENHEIT } currentUnits={ units } setUnits={ setUnits }/>
              </div>
            </div>
            <span className="description">{ today.description }</span>
          </div>
        </div>
      }
    </>
  );
};

export default Today;
