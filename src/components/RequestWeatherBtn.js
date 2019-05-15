import React from "react";

export default function RequestWeatherBtn(props) {
  if (!props.request) {
    return (
      <button className="getWeatherBtn" onClick={() => props.getWeather()}>
        Check the Weather
      </button>
    );
  }
  return (
    <button
      className="getWeatherBtn refresh"
      onClick={() => props.getWeather()}
    >
      Refresh
    </button>
  );
}
