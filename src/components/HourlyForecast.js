import React, { Component } from "react";
import axios from "axios";
import Clock from "react-live-clock";
import Moment from "react-moment";
import "moment-timezone";
import Time from "./Time";
import LocationImage from "./LocationImage";

class HourlyForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "Miami",
      date: "",
      days: [],
      daysFull: [],
      temps: [],
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
  fetchHourlyForecast = () => {
    const url = this.urlApiForHourly();
    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });
      const hourlyForecastData = this.hourlyForecastData();
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const now = "Current Weather";
      const weekDayName =
        weekdays[new Date(hourlyForecastData.dt_txt).getDay()];
      const hourlyTemp = Math.round(hourlyForecastData.main.temp);
      const hourlyMinTemp = Math.round(hourlyForecastData.main.temp_min);
      const hourlyMaxTemp = Math.round(hourlyForecastData.main.temp_max);
      const hourlyHumidity = Math.round(hourlyForecastData.main.humidity);
      const hourlyPressure = Math.round(hourlyForecastData.main.pressure);
      const hourlyWind = Math.round(hourlyForecastData.wind.speed);
      const hourlyWeather = hourlyForecastData.weather[0].description;
      const hourlyIcon = hourlyForecastData.weather[0].icon;
      const days = [];
      const daysFull = [];
      const temps = [];
      const minTemps = [];
      const maxTemps = [];
      const c_humidity = [];
      const c_pressure = [];
      const c_wind = [];
      const weather = [];
      const icons = [];
      for (let i = 0; i < this.state.data.list.length; i = i + 1) {
        let date = new Date(this.state.data.list[i].dt_txt);
        let dayFull = weekdays[date.getDay()];
        days.push(this.state.data.list[i].dt_txt);
        daysFull.push(dayFull);
        temps.push(Math.round(this.state.data.list[i].main.temp));
        minTemps.push(Math.round(this.state.data.list[i].main.temp_min));
        maxTemps.push(Math.round(this.state.data.list[i].main.temp_max));
        c_humidity.push(Math.round(this.state.data.list[i].main.humidity));
        c_pressure.push(Math.round(this.state.data.list[i].main.pressure));
        c_wind.push(Math.round(this.state.data.list[i].wind.speed));
        weather.push(this.state.data.list[i].weather[0].description);
        icons.push(this.state.data.list[i].weather[0].icon);
      }
      this.setState({
        days: [now, ...days.slice(1)],
        daysFull: [weekDayName, ...daysFull.slice(1)],
        temps: [hourlyTemp, ...temps.slice(1)],
        minTemps: [hourlyMinTemp, ...minTemps.slice(1)],
        maxTemps: [hourlyMaxTemp, ...maxTemps.slice(1)],
        c_humidity: [hourlyHumidity, ...c_humidity.slice(1)],
        c_pressure: [hourlyPressure, ...c_pressure.slice(1)],
        c_wind: [hourlyWind, ...c_wind.slice(1)],
        weather: [hourlyWeather, ...weather.slice(1)],
        icons: [hourlyIcon, ...icons.slice(1)]
      });
    });
  };
  urlApiForHourly = () => {
    const location = encodeURIComponent(this.state.location);
    const appId = "&APPID=d94f810c218fa367514761ac7f7bc5bc&units=metric";
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}${appId}`;
    return weatherURL;
  };
  hourlyForecastData = () => {
    const list = this.state.data.list;
    return list.find(e => new Date(e.dt_txt * 1000));
  };
  componentDidMount() {
    this.fetchHourlyForecast();
  }
  changeLocation = e => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation
      },
      () => {
        this.fetchHourlyForecast();
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
      <div className="container-content">
        <div className="DateTime">
          <div className="CurrentDate">
            <Moment format="ddd MMMM Do YYYY">
              {<Time date={this.state.date} />}
            </Moment>
          </div>
          <br />
          <Clock
            style={{ fontSize: "1.5em" }}
            format={"h:mm:ssa"}
            ticking={true}
          />
        </div>
        <div className="location-image-hourly">
          <LocationImage />
        </div>
        <form onSubmit={this.changeLocation} className="Hourly-Form">
          <div className="inline-input">
            <input
              className="location-input"
              defaultValue={this.state.location}
              type="text"
              ref={input => (this.locationInput = input)}
            />
          </div>
        </form>
        <hr />
        <div className="main-display-hourly">
          <div className="sub-info-title-hourly">
            {this.state.daysFull[this.state.displayIndex]}
          </div>
          <div>
            <div className="temp-measurement">
              {this.state.temps[this.state.displayIndex]}
              <span className="temp-unit-hourly">°C</span>
            </div>
          </div>
          <div className="sub-info-hourly">
            <div>
              {" "}
              <img
                width="220"
                height="220"
                src={
                  "http://openweathermap.org/img/w/" +
                  `${this.state.icons[this.state.displayIndex]}` +
                  ".png"
                }
                alt="Weather Icon"
              />
            </div>
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
              <b>Wind Speed : </b>
              {this.state.c_wind[this.state.displayIndex]} m/s
            </div>
            <div>
              <span className="max-temp">
                <i className="mdi mdi-arrow-up" />
                Max.Temp. ={this.state.maxTemps[this.state.displayIndex]}
                °C
              </span>
              <span className="min-temp">
                <i className="mdi mdi-arrow-down" />
                Min.Temp. ={this.state.minTemps[this.state.displayIndex]}
                °C
              </span>
            </div>
          </div>
          <hr />
        </div>
        <div className="selection-panel">
          <div className="selection-row">
            <table>
              <tbody>
                {this.state.days.map((item, index) => {
                  if (this.state.displayIndex === index) {
                    return (
                      <tr
                        className="selectiondays selected card"
                        key={index + 1}
                        onClick={() => this.setIndex(index)}
                      >
                        <td className="hourly">{item}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        className="selectiondays card"
                        key={index + 1}
                        onClick={() => this.setIndex(index)}
                      >
                        <td className="hourly">{item}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="gify1">
          <img
            width="420px"
            height="380px"
            src={"https://media2.giphy.com/media/10ku8RPTtIWa5i/source.gif"}
            aria-hidden
            alt="Weather Image"
          />
        </div>
        <img
          width="1100"
          height="540"
          src={
            "https://codemyui.com/wp-content/uploads/2017/08/cartoony-weather-animations-in-css.gif"
          }
          aria-hidden
          alt="Weather Image"
        />
      </div>
    );
  }
}
export default HourlyForecast;
