import React from "react";

export default class WeatherResults extends React.Component {
  render() {
    const { error } = this.props;
    const {
      summary,
      temperature,
      precipProbability
    } = this.props.data.currently;
    console.log(error);
    if (!error) {
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
