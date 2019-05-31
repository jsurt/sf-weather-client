import React from "react";
import { Transition } from "react-spring/renderprops";

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
      margin: "auto",
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
    const item = button;
    return (
      <Transition
        items={item}
        from={{
          overflow: "hidden",
          height: 0
        }}
        enter={{ height: "auto" }}
        // trail={500}
      >
        {item => props => <div style={props}>{button}</div>}
      </Transition>
    );
  }
}
