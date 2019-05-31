import React from "react";
import { Transition, config } from "react-spring/renderprops";

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
      height: "25px",
      width: "162px",
      borderRadius: "1px",
      border: "none",
      background: "#bbbbbb"
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
    const button = (
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
    );
    const item = button;
    return (
      <Transition
        items={item}
        from={{ position: "relative", left: 500, opacity: 0 }}
        enter={{ left: 0, opacity: 1 }}
        config={{ tension: 150, friction: 14 }}
      >
        {item => props => <div style={props}>{button}</div>}
      </Transition>
    );
  }
}
