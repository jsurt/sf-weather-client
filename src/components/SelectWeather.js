import React from "react";
import { Spring, Transition } from "react-spring/renderprops";

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
    background: "#333333",
    cursor: "pointer"
  }
};

const getMarkerStyles = (showtime, hover) => {
  let currentStyle = Object.assign({}, styles.marker, {left: "54px"})
  if(showtime && !hover) {
    return {...styles.marker}
  } else if (!showtime && !hover) {
    return {...currentStyle}
  } else if (showtime && hover) {
    return {...styles.marker, ...styles.hover}
  } else {
    return {...currentStyle, ...styles.hover}
  }
}

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
    const slider = (
      <Transition 
        from={{ left: showtimeWeather ? "0px" : "54px" }}
      >
        <div
          style={track}
        >
          <div style={getMarkerStyles(showtimeWeather, this.state.hover)} 
            onClick={() => selectWeather()}
            onMouseOver={() => this.setState({hover: true})}
            onMouseLeave={() => this.setState({hover: false})}
          />
        </div>
      </Transition>
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

// const selectWeatherBtnText = showtimeWeather
// ? "Current weather"
// : "Showtime weather";
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
