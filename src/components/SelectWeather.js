import React from "react";

const wrapStyles = {
  display: "flex",
  justifyContent: "center"
};

const inputStyles = {};

const labelStyles = {};

export default function SelectWeather(props) {
  return (
    <div style={wrapStyles} className="radioBtnWrap">
      <input
        type="radio"
        id="showtime"
        name="weather-switch"
        value="showtime"
        defaultChecked={true}
        onClick={e => props.selectWeather(e)}
        style={inputStyles}
      />
      <label style={labelStyles} htmlFor="showtime">
        Showtime
      </label>
      <input
        type="radio"
        id="current"
        name="weather-switch"
        value="current"
        onClick={e => props.selectWeather(e)}
        style={inputStyles}
      />
      <label style={labelStyles} htmlFor="showtime">
        Currently
      </label>
    </div>
  );
}
