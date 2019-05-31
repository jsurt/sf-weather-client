import React from "react";
import RequestWeatherBtn from "./RequestWeatherBtn";
import WeatherResults from "./WeatherResults";

export default class Dashboard extends React.Component {
  render() {
    const {
      request,
      success,
      error,
      requesting,
      data,
      getWeather,
      refreshWeather
    } = this.props;
    if (!request) {
      return <RequestWeatherBtn request={request} getWeather={getWeather} />;
    } else {
      return (
        <React.Fragment>
          <WeatherResults success={success} error={error} data={data} />
          <RequestWeatherBtn
            request={request}
            requesting={requesting}
            refreshWeather={refreshWeather}
          />
        </React.Fragment>
      );
    }
  }
}
