import React from "react";
import Dashboard from "./Dashboard";
import MainLogo from "./MainLogo";
import SelectWeather from "./SelectWeather";
import "./App.css";
import { SERVER_URL } from "../config";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getWeatherRequest: false,
      getWeatherSuccess: false,
      getWeatherError: false,
      requesting: false,
      weatherData: null,
      showtimeWeather: true
    };
    this.handleRequestWeather = this.handleRequestWeather.bind(this);
    this.handleRefreshWeather = this.handleRefreshWeather.bind(this);
    this.selectWeatherTime = this.selectWeatherTime.bind(this);
  }

  handleRefreshWeather() {
    this.setState({
      getWeatherRequest: false,
      getWeatherSuccess: false,
      getWeatherError: false,
      requesting: false,
      weatherData: null
    });
    this.handleRequestWeather();
  }

  handleRequestWeather() {
    this.setState({ getWeatherRequest: true, requesting: true });
    this.requestWeather();
  }

  requestWeather() {
    const { showtimeWeather } = this.state;
    let url;
    if (showtimeWeather) {
      url = `${SERVER_URL}/showtime_weather`;
    } else {
      url = `${SERVER_URL}/weather`;
    }
    fetch(url)
      .then(data => data.json())
      .then(json => {
        setTimeout(
          () =>
            this.setState({
              getWeatherSuccess: true,
              requesting: false,
              weatherData: json
            }),
          2800
        );
      })
      .catch(err => {
        console.error(err);
        this.setState({ getWeatherError: true });
      });
  }

  selectWeatherTime() {
    const { showtimeWeather } = this.state;
    this.setState({ showtimeWeather: !showtimeWeather }, () => {
      this.handleRefreshWeather();
    });
  }

  render() {
    //Destructuring state
    const {
      getWeatherRequest,
      getWeatherSuccess,
      getWeatherError,
      requesting,
      weatherData,
      showtimeWeather
    } = this.state;

    //Styles for <main>
    let mainStyle = {
      height: "100%"
    };

    return (
      <main style={mainStyle}>
        <section className="selectWeatherSec">
          <SelectWeather
            requesting={requesting}
            showtimeWeather={showtimeWeather}
            selectWeather={this.selectWeatherTime}
            refreshWeather={this.handleRefreshWeather}
          />
        </section>
        <MainLogo requesting={requesting} request={getWeatherRequest} />
        <Dashboard
          request={getWeatherRequest}
          success={getWeatherSuccess}
          error={getWeatherError}
          requesting={requesting}
          data={weatherData}
          getWeather={this.handleRequestWeather}
          refreshWeather={this.handleRefreshWeather}
        />
      </main>
    );
  }
}
