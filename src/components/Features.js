import React from "react";
import Clock from "react-live-clock";
import Moment from "react-moment";
import "moment-timezone";
import Titles from "./Titles";
import Date from "./CurrentDate";
import WeatherImage from "./WeatherImage";

const HowTo = () => (
  <div>
    <div className="CurrentDate">
      <Moment format="ddd MMMM Do YYYY">
        <Date />
      </Moment>
    </div>
    <div className="CurrentTime">
      <Clock style={{ fontSize: "1.5em" }} format={"h:mm:ssa"} ticking={true} />
    </div>
    <Titles />
    <h1 className="How">App Features</h1>
    <div className="HowTo">
      <p>
        1. The Weather App displays a 7-day daily weather forecast and 5-day
        hourly weather forecast.
      </p>
      <p>
        2. It has the ability to click on a day and see its weather details.
      </p>
      <p>
        3. The hourly forecast displays for a particular day hourly weather
        details.
      </p>
      <p>
        4. The Daily forecast button shows the high and low temperatures, and an
        image for sunny/rainy/cloudy/snowy for a particular day.
      </p>
      <p>
        5. It can just maintain the current view in the top-level App state.
      </p>
    </div>
    <WeatherImage />
  </div>
);

export default HowTo;
