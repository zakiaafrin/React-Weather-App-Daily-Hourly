import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import HowTo from "./components/Features";
import Titles from "./components/Titles";
import "./App.css";

function Daily() {
  return (
    <div className="hourlytitle">
      <Titles />
      <DailyForecast />
    </div>
  );
}

function Hourly() {
  return (
    <div className="hourlytitle">
      <Titles />
      <HourlyForecast />
    </div>
  );
}

function Instructions() {
  return (
    <h2>
      <HowTo />
    </h2>
  );
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="ul">
            <li>
              <Link to="/">Daily Forecast</Link>
            </li>
            <li>
              <Link to="/HourlyForecast/">Hourly Forecast</Link>
            </li>
            <li>
              <Link to="/Features/">Features</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Daily} />
        <Route path="/HourlyForecast/" component={Hourly} />
        <Route path="/Features/" component={Instructions} />
      </div>
    </Router>
  );
}

export default AppRouter;
