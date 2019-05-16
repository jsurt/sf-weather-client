import React from "react";

export default class WeatherResults extends React.Component {
  render() {
    console.log(this.props);
    const { request, success, error, data } = this.props;
    let summary, temperature, precipProbability;
    if (data !== null) {
      summary = data.currently.summary;
      temperature = data.currently.temperature;
      precipProbability = data.currently.precipProbability;
    }
    if (request && !success) {
      return (<p>Getting data</p>);
    } else if (success) {
      return (
        <div>
          <p>
            It is {temperature} &deg;F and {summary} in Bardstown with a{" "}
            {precipProbability}% chance of rain
          </p>
        </div>
      );
    }
    return <h6>Error</h6>;
  }
}
