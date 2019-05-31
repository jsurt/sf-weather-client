import React from "react";
import { Transition, config } from "react-spring/renderprops";

export default class RequestWeatherBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  styles = {
    getWeatherBtnStyles: {
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
    const { request, getWeather, requesting, refreshWeather } = this.props;
    const { getWeatherBtnStyles, hover } = this.styles;
    let button;
    if (!request) {
      button = (
        <button
          className="getWeatherBtn"
          onClick={() => getWeather()}
          onMouseOver={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          style={
            this.state.hover
              ? Object.assign({}, getWeatherBtnStyles, hover)
              : getWeatherBtnStyles
          }
        >
          Check the Weather
        </button>
      );
    } else if (requesting) {
      button = <noscript />;
    } else {
      button = (
        <button
          className="getWeatherBtn refresh"
          onClick={() => refreshWeather()}
          onMouseOver={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          style={
            this.state.hover
              ? Object.assign({}, getWeatherBtnStyles, hover)
              : getWeatherBtnStyles
          }
        >
          Refresh
        </button>
      );
    }
    const show = button;
    return (
      <Transition
        items={show}
        from={{
          position: "relative",
          right: 500,
          opacity: 0
        }}
        enter={{
          right: 0,
          opacity: 1
        }}
        trail={500}
        config={{ tension: 150, friction: 14 }}
      >
        {show => props => <div style={props}>{show}</div>}
      </Transition>
    );
  }
}
