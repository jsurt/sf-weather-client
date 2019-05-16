import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import { SERVER_URL } from "../config";
import logo from "../images/sf-logo.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      getWeatherRequest: false,
      getWeatherSuccess: false,
      getWeatherError: false,
      weatherData: null
    };
    this.state = this.initialState;
    this.handleRequestWeather = this.handleRequestWeather.bind(this);
  }

  handleRequestWeather() {
    console.log("Request for weather made");
    this.setState(this.initialState);
    this.setState({ getWeatherRequest: true });
    this.requestWeather();
  }

  requestWeather() {
    fetch(`${SERVER_URL}/weather`)
      .then(data => data.json())
      .then(json => {
        console.log("The weather has been fetched", json);
        // this.setState({ getWeatherSuccess: true, weatherData: json });
        setTimeout(
          () => this.setState({ getWeatherSuccess: true, weatherData: json }),
          2000
        );
      })
      .catch(err => {
        console.error(err);
        this.setState({ getWeatherError: true });
      });
  }

  render() {
    const {
      getWeatherRequest,
      getWeatherSuccess,
      getWeatherError,
      weatherData
    } = this.state;
    return (
      <main>
        <img src={logo} alt="Stephen Foster Story logo" />
        <Dashboard
          request={getWeatherRequest}
          success={getWeatherSuccess}
          error={getWeatherError}
          data={weatherData}
          getWeather={this.handleRequestWeather}
        />
      </main>
    );
  }
}
