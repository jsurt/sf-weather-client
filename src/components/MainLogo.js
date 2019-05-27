import React from "react";
import { Spring } from "react-spring/renderprops";
import logo from "../images/sf-logo-cropped.png";

const logoStyles = {
  borderRadius: "50%"
}

export default function MainLogo(props) {
  if (!props.requesting) {
    return (
      <img
        style={logoStyles}
        src={logo}
        alt="Stephen Foster Story logo"
      />
    );
  } else {
    return (
      <Spring
        from={{ transform: "rotate(0deg)" }}
        to={{ transform: "rotate(720deg)" }}
        config={{ tension: 210, friction: 90, precision: 0 }}
      >
        {props => (
          <React.Fragment>
            <img src={logo} alt="Stephen Foster Story logo" style={props} />
          </React.Fragment>
        )}
      </Spring>
    );
  }
}
