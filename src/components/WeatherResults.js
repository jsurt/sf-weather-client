import React from "react";

export default class WeatherResults extends React.Component {
  render() {
    console.log(this.props);
    const { success, error, data } = this.props;
    let summary, temperature, precipProbability;
    if (data !== null) {
      summary = data.currently.summary;
      temperature = data.currently.temperature;
      precipProbability = data.currently.precipProbability;
    }
    //Render different feedback depending outcome of request
    if (error) {
      return <h6>Error: {error}</h6>;
    } else if (success) {
      return (
        <div>
          <p>
            It is {temperature} &deg;F and {summary} in Bardstown with a{" "}
            {precipProbability*100}% chance of rain
          </p>
        </div>
      );
    } else {
      return <p>Getting data</p>;
    }
  }
}
