import React from "react";
import RequestWeatherBtn from "./RequestWeatherBtn";
import WeatherResults from "./WeatherResults";

export default class Dashboard extends React.Component {
  render() {
    const { request, success, error, data, getWeather } = this.props;
    console.log(data);
    if (!request) {
      return <RequestWeatherBtn request={request} getWeather={getWeather} />;
    } else {
      return (
        <React.Fragment>
          <WeatherResults request={request} success={success} error={error} data={data} />
          <RequestWeatherBtn request={request} getWeather={getWeather} />
        </React.Fragment>
      );
    }
  }
}
