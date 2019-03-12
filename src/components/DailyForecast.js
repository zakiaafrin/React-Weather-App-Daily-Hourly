import React, { Component } from "react";
import axios from "axios";
import Clock from "react-live-clock";
import Moment from "react-moment";
import "moment-timezone";
import Time from "./Time";
import LocationImage from "./LocationImage";
import WeatherImage from "./WeatherImage";

class DailyForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "Miami",
      date: "",
      days: [],
      daysFull: [],
      temps_day: [],
      temps_night: [],
      minTemps: [],
      maxTemps: [],
      c_humidity: [],
      c_pressure: [],
      c_wind: [],
      weather: [],
      icons: [],
      displayIndex: 0
    };
  }
  fetchDailyForecast = () => {
    const url = this.urlApiForDaily();
    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });
      const dailyForecastData = this.dailyForecastData();
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const today = dailyForecastData.dt;
      const weekDayName =
        weekdays[new Date(dailyForecastData.dt * 1000).getDay()];
      const dailyTemp_day = Math.round(dailyForecastData.temp.day);
      const dailyTemp_night = Math.round(dailyForecastData.temp.night);
      const dailyMinTemp = Math.round(dailyForecastData.temp.min);
      const dailyMaxTemp = Math.round(dailyForecastData.temp.max);
      const dailyHumidity = Math.round(dailyForecastData.humidity);
      const dailyPressure = Math.round(dailyForecastData.pressure);
      const dailyWind = Math.round(dailyForecastData.speed);
      const dailyWeather = dailyForecastData.weather[0].description;
      const dailyIcon = dailyForecastData.weather[0].icon;
      const days = [];
      const daysFull = [];
      const temps_day = [];
      const temps_night = [];
      const minTemps = [];
      const maxTemps = [];
      const c_humidity = [];
      const c_pressure = [];
      const c_wind = [];
      const weather = [];
      const icons = [];
      for (let i = 0; i < this.state.data.list.length; i = i + 1) {
        let dayFull =
          weekdays[new Date(this.state.data.list[i].dt * 1000).getDay()];
        days.push(this.state.data.list[i].dt);
        daysFull.push(dayFull);
        temps_day.push(Math.round(this.state.data.list[i].temp.day));
        temps_night.push(Math.round(this.state.data.list[i].temp.night));
        minTemps.push(Math.round(this.state.data.list[i].temp.min));
        maxTemps.push(Math.round(this.state.data.list[i].temp.max));
        c_humidity.push(Math.round(this.state.data.list[i].humidity));
        c_pressure.push(Math.round(this.state.data.list[i].pressure));
        c_wind.push(Math.round(this.state.data.list[i].speed));
        weather.push(this.state.data.list[i].weather[0].description);
        icons.push(this.state.data.list[i].weather[0].icon);
      }
      this.setState({
        days: [today, ...days.slice(1)],
        daysFull: [weekDayName, ...daysFull.slice(1)],
        temps_day: [dailyTemp_day, ...temps_day.slice(1)],
        temps_night: [dailyTemp_night, ...temps_night.slice(1)],
        minTemps: [dailyMinTemp, ...minTemps.slice(1)],
        maxTemps: [dailyMaxTemp, ...maxTemps.slice(1)],
        c_humidity: [dailyHumidity, ...c_humidity.slice(1)],
        c_pressure: [dailyPressure, ...c_pressure.slice(1)],
        c_wind: [dailyWind, ...c_wind.slice(1)],
        weather: [dailyWeather, ...weather.slice(1)],
        icons: [dailyIcon, ...icons.slice(1)]
      });
    });
  };
  urlApiForDaily = () => {
    const location = encodeURIComponent(this.state.location);
    const appId = "&APPID=fbf712a5a83d7305c3cda4ca8fe7ef29&units=metric&cnt=7";
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}${appId}`;
    return weatherURL;
  };
  dailyForecastData = () => {
    const list = this.state.data.list;
    return list.find(e => new Date(e.dt * 1000));
  };
  componentDidMount() {
    this.fetchDailyForecast();
  }
  changeLocation = e => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation
      },
      () => {
        this.fetchDailyForecast();
      }
    );
  };
  setIndex = index => {
    this.setState({
      displayIndex: index
    });
  };
  render() {
    return (
      <div>
        <div className="location-container">
          <div>
            <Moment format="ddd MMMM Do YYYY">
              {<Time date={this.state.date} />}
            </Moment>
          </div>
        </div>
        <form onSubmit={this.changeLocation}>
          <div className="daily-inline-input">
            <div className="location-sign-daily">
              <LocationImage />
            </div>
            <input
              className="location-input"
              defaultValue={this.state.location}
              type="text"
              ref={input => (this.locationInput = input)}
            />
          </div>
        </form>
        <hr />
        <div className="main-display">
          <div className="main-info">
            <div className="sub-info-title">
              {this.state.daysFull[this.state.displayIndex]}
            </div>
            <div className="daily-weather">
              <img
                width="220"
                height="220"
                src={
                  "http://openweathermap.org/img/w/" +
                  `${this.state.icons[this.state.displayIndex]}` +
                  ".png"
                }
                alt="weather-icon"
              />
            </div>
            <div className="temp-measurement">
              {this.state.temps_day[this.state.displayIndex]}
            </div>
            <div className="temp-unit">°C</div>
          </div>
          <div className="sub-info">
            <div className="sub-info-des">
              <b>Description : </b>
              {this.state.weather[this.state.displayIndex]}
            </div>
            <div>
              <b>Humidity : </b>
              {this.state.c_humidity[this.state.displayIndex]}%
            </div>
            <div>
              <b>Pressure : </b>
              {this.state.c_pressure[this.state.displayIndex]} HPa
            </div>
            <div>
              <b>Wind-Speed : </b>
              {this.state.c_wind[this.state.displayIndex]} m/s
            </div>
            <div>
              <b>Day Temp. : </b>
              {this.state.temps_day[this.state.displayIndex]}
              °C
            </div>
            <div>
              <b>Night Temp. : </b>
              {this.state.temps_night[this.state.displayIndex]}
              °C
            </div>
            <div>
              <span className="max-temp">
                <i className="mdi mdi-arrow-up" />
                Max.Temp. : {this.state.maxTemps[this.state.displayIndex]}
                °C
              </span>
              <span className="min-temp">
                <i className="mdi mdi-arrow-down" />
                Min.Temp. : {this.state.minTemps[this.state.displayIndex]}
                °C
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className="selection-panel-daily">
          <div className="selection-row-daily">
            {this.state.days.map((item, index) => {
              if (this.state.displayIndex === index) {
                return (
                  <div
                    className="selection-days selected card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <div className="daily">
                      <Moment unix format="dddd">
                        {item}
                      </Moment>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-days card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <div className="daily">
                      <Moment unix format="dddd">
                        {item}
                      </Moment>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="selection-row-daily">
            {this.state.icons.map((item, index) => {
              if (this.state.displayIndex === index) {
                return (
                  <div
                    className="selection-icons selected card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <img
                      width="150"
                      height="150"
                      src={`http://openweathermap.org/img/w/${item}.png`}
                      alt="weather-icon"
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-icons card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <img
                      width="150"
                      height="150"
                      src={`http://openweathermap.org/img/w/${item}.png`}
                      alt="weather-icon"
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="selection-row-daily">
            {this.state.maxTemps.map((item, index) => {
              if (this.state.displayIndex === index) {
                return (
                  <div
                    className="selection-days selected card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <div className="daily">
                      <i className="mdi mdi-arrow-up" />
                      Max.Temp. {item}°C
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-days card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <div className="daily">
                      <i className="mdi mdi-arrow-up" />
                      Max.Temp. {item}°C
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="selection-row-daily">
            {this.state.minTemps.map((item, index) => {
              if (this.state.displayIndex === index) {
                return (
                  <div
                    className="selection-days selected card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <div className="daily">
                      <i className="mdi mdi-arrow-down" />
                      Min.Temp. {item}°C
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-days card-daily"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <div className="daily">
                      <i className="mdi mdi-arrow-down" />
                      Min.Temp. {item}°C
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="Time">
          <Clock format={"h:mm:ssa"} ticking={true} />
        </div>
        <div className="weather-img">
          <WeatherImage />
        </div>
      </div>
    );
  }
}
export default DailyForecast;
