import React from "react";
import { Spring } from "react-spring/renderprops";

export default class SelectWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  styles = {
    wrapStyles: {
      display: "flex",
      justifyContent: "center"
    },
    selectWeatherBtnStyles: {
      borderRadius: "10px",
      height: "25px",
      width: "162px"
    },
    hover: {
      background: "#eeeeee",
      cursor: "pointer"
    }
  };

  render() {
    const { showtimeWeather, selectWeather } = this.props;
    const { wrapStyles, selectWeatherBtnStyles, hover } = this.styles;
    const selectWeatherBtnText = showtimeWeather
      ? "Current weather"
      : "Showtime weather";
    return (
      <div style={wrapStyles} className="selectWeatherBtnWrap">
        <button
          className="selectWeatherBtn current"
          onClick={() => selectWeather()}
          onMouseOver={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          style={
            this.state.hover
              ? Object.assign({}, selectWeatherBtnStyles, hover)
              : selectWeatherBtnStyles
          }
        >
          {selectWeatherBtnText}
        </button>
      </div>
    );
  }
}
