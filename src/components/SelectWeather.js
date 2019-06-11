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
  },
  label: {
    padding: "5px"
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
    const { track, marker, hover, label } = styles;
    const showtimeLabel = (
      <Spring to={{ opacity: toggle ? 1 : 0.5 }}>
        {props => (
          <animated.p style={{ ...label, ...props }}>Showtime</animated.p>
        )}
      </Spring>
    );
    const currentLabel = (
      <Spring to={{ opacity: toggle ? 0.5 : 1 }}>
        {props => (
          <animated.p style={{ ...label, ...props }}>Current</animated.p>
        )}
      </Spring>
    );
    const slider = (
      <div style={track}>
        <Spring to={{ left: toggle ? "0px" : "54px" }}>
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
        {item => props => (
          <React.Fragment>
            {showtimeLabel}
            <div style={props}>{slider}</div>
            {currentLabel}
          </React.Fragment>
        )}
      </Transition>
    );
  }
}
