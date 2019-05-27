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
    console.log("Refreshing data");
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
    console.log("Request for weather made");
    this.setState({ getWeatherRequest: true, requesting: true });
    this.requestWeather();
  }

  requestWeather() {
    const { showtimeWeather } = this.state;
    let url;
    if (showtimeWeather === true) {
      url = `${SERVER_URL}/showtime_weather`;
    } else {
      url = `${SERVER_URL}/weather`;
    }
    fetch(url)
      .then(data => data.json())
      .then(json => {
        console.log("The weather has been fetched", json);
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

  selectWeatherTime(event) {
    console.log(event.target.value);
    if (event.target.value === "showtime") {
      this.setState({ showtimeWeather: true });
    } else {
      this.setState({ showtimeWeather: false });
    }
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

    //Styles
    let mainStyle = {
      height: "100%"
    };

    //Get color for background if request is successful
    const calcBackgroundColor = probability => {
      const hue = probability * 100 * 1.36 + 112;
      return (mainStyle = Object.assign({}, mainStyle, {
        background: `hsl(${hue}, 100%, 58%)`
      }));
    };

    //Different styles for requesting data, successfully received data, or data request errored out
    if (getWeatherError) {
      mainStyle = Object.assign({}, mainStyle, {
        background: "#ff0000"
      });
    } else if (getWeatherSuccess) {
      mainStyle = calcBackgroundColor(weatherData.currently.precipProbability);
    } else if (getWeatherRequest) {
      mainStyle = Object.assign({}, mainStyle, {
        background: "#999999"
      });
    }
    return (
      <main style={mainStyle}>
        <section className="selectWeatherSec">
          <SelectWeather
            showtimeWeather={showtimeWeather}
            selectWeather={this.selectWeatherTime}
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
