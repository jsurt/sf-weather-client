import React from "react";

export default function RequestWeatherBtn(props) {
  if (!props.request) {
    return (
      <button className="getWeatherBtn" onClick={() => props.getWeather()}>
        Check the Weather
      </button>
    );
  } else if (props.requesting) {
    return <noscript />;
  } else {
    return (
      <button
        className="getWeatherBtn refresh"
        onClick={() => props.refreshWeather()}
      >
        Refresh
      </button>
    );
  }
}
