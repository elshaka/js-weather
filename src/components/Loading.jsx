import React from 'react';
import Spinner from '../assets/images/spinner.gif';

const Loading = () => (
  <div className="loading">
    <img src={Spinner} />
  </div>
);

export default Loading;
