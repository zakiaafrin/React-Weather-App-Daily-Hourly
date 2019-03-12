import React from "react";

const Time = props => (
  <div className="weather__info">
    {props.date && <p className="weather-date">{props.date}</p>}
    {props.time && (
      <p className="weather-date">
        {props.time.getHours()}:{props.time.getMinutes()}:
        {props.time.getSeconds()}
      </p>
    )}
    {props.error && <p className="weather-details">{props.error}</p>}
  </div>
);

export default Time;
