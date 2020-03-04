import React, { useState } from 'react';

const Search = ({ getWeather }) => {
  const [location, setLocation] = useState('');

  const onChange = (e) => setLocation(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    const l = location.trim().toLowerCase();
    if (l) {
      getWeather(l);
    }
  };

  return (
    <form className="search" onSubmit={onSubmit}>
      <input placeholder="Enter a city name" onChange={onChange} value={location} />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
