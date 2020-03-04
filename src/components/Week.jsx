import React from 'react';
import { convert } from '../utils/converter';

const Week = ({ week, units }) => {
  return (
    <div className="week">
      { week.map((day, index) => (
          <div key={index} className="day">
            <span className="name">{ day.date }</span>
            <img className="icon" src={ day.icon } />
            <span className="max-temp">{ convert(day.tempMax, units) }°</span>
            <span className="min-temp">{ convert(day.tempMin, units) }°</span>
          </div>
        ))
      }
    </div>
  );
};

export default Week;
