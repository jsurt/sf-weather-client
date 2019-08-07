import React from "react";
import { Spring, Transition } from "react-spring/renderprops";
import { animated } from 'react-spring'

const styles = {
  header: {
    fontFamily: "Raleway, sans-serif",
    fontSize: "18px",
    fontWeight: "100",
    marginBottom: "10px"
  },
  trackWrap: {
    width: "275px",
    margin: "auto",
    marginTop: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  track: {
    display: "flex",
    alignItems: "center",
    width: "75px",
    height: "15px",
    margin: "auto",
    marginTop: "2px",
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
  label: {
    paddingLeft: "10px",
    paddingRight: "10px",
    marginTop: "0px",
    fontFamily: "Raleway, sans-serif"
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
    const { selectWeather } = this.props;
    const { header, trackWrap, track, marker, label } = styles;
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
          <animated.p style={{ ...label, ...props }}>Right Now</animated.p>
        )}
      </Spring>
    );
    const slider = (
      <div style={track}>
        <Spring
          from={{ left: toggle ? "54px" : "0px" }}
          to={{ left: toggle ? "0px" : "54px" }}
          config={{ tension: 190, friction: 14, precision: 0.01 }}
        >
          {props => (
            <animated.div
              style={this.state.hover ? Object.assign({}, {...marker, ...props, width: "25px", height: "25px"}) : { ...marker, ...props }}
              onMouseOver={() => {this.setState({ hover: true })}}
              onMouseLeave={() => this.setState({ hover: false })}
              onClick={() => {
                this.setState({ hover: false, toggle: !toggle });
                selectWeather();
              }}
            />
          )}
        </Spring>
      </div>
    );
    //const springs = useSpring({from:{left: "0px"}, to:{left: "54px"}});
    const item = slider;
    return (
      <Transition
        items={item}
        from={{ position: "relative", left: 500, opacity: 0 }}
        enter={{ left: 0, opacity: 1 }}
        config={{ tension: 150, friction: 14 }}
      >
        {item => props => (
          <section>
            <h4 style={header}>I want the weather in Bardstown for:</h4>
            <div style={{ ...trackWrap, ...props }}>
              {showtimeLabel}
              {slider}
              {currentLabel}
            </div>
          </section>
        )}
      </Transition>
    );
  }
}
