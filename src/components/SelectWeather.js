import React from "react";
import { Spring, Transition, animated } from "react-spring/renderprops";

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
    borderRadius: "50%",
    background: "#000000",
    cursor: "pointer"
  },
  hover: {
    background: "#333333",
    cursor: "pointer"
  }
};

const getMarkerStyles = (showtime, hover) => {
  let currentStyle = Object.assign({}, styles.marker, { left: "54px" });
  if (showtime && !hover) {
    return { ...styles.marker };
  } else if (!showtime && !hover) {
    return { ...currentStyle };
  } else if (showtime && hover) {
    return { ...styles.marker, ...styles.hover };
  } else {
    return { ...currentStyle, ...styles.hover };
  }
};

export default class SelectWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      toggle: true
    };
  }

  render() {
    const { toggle } = this.state;
    const { requesting, showtimeWeather, selectWeather } = this.props;
    const { track, marker, hover } = styles;

    const slider = (
      <div style={track}>
        <Spring to={{ left: this.state.toggle ? "0px" : "54px" }}>
          {props => (
            <animated.div
              style={{ ...marker, ...props }}
              onClick={() => this.setState({ toggle: !toggle })}
            />
          )}
        </Spring>
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
