import React from "react";
import { Transition } from "react-spring/renderprops";

const styles = {
  track: {
    display: "flex",
    alignItems: "center",
    width: "75px",
    height: "15px",
    margin: "10px auto",
    background: "#eeeeee",
    borderRadius: "15px"
  },
  marker: {
    display: "inline-block",
    width: "21px",
    height: "21px",
    position: "relative",
    left: "0px",
    borderRadius: "50%",
    background: "#000000"
  },
  hover: {
    background: "#eeeeee",
    cursor: "pointer"
  }
};

export default class SelectWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const { requesting, showtimeWeather, selectWeather } = this.props;
    const { track, marker, hover } = styles;
    const selectWeatherBtnText = showtimeWeather
      ? "Current weather"
      : "Showtime weather";
    const slider = (
      <div
        style={
          showtimeWeather ? track : Object.assign({}, track, { left: "54px" })
        }
      >
        <div style={marker} />
      </div>
    );
    const item = slider;
    return (
      <Transition
        items={item}
        from={{ position: "relative", left: 500, opacity: 0 }}
        enter={{ left: 0, opacity: 1 }}
        config={{ tension: 150, friction: 14 }}
      >
        {item => props => <div style={props}>{slider}</div>}
      </Transition>
    );
  }
}

// const button = (
//   <button
//     className="selectWeatherBtn current"
//     onClick={() => {
//       selectWeather();
//     }}
//     onMouseOver={() => this.setState({ hover: true })}
//     onMouseLeave={() => this.setState({ hover: false })}
//     style={
//       this.state.hover
//         ? Object.assign({}, selectWeatherBtnStyles, hover)
//         : selectWeatherBtnStyles
//     }
//     disabled={requesting}
//   >
//     {selectWeatherBtnText}
//   </button>
// );
// selectWeatherBtnStyles: {
//   height: "25px",
//   width: "162px",
//   borderRadius: "1px",
//   border: "none",
//   background: "#bbbbbb"
// },
