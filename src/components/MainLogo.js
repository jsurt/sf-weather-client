import React from "react";
import { useSpring, animated } from "react-spring";
import Logo from "../images/sf-logo-cropped.png";

const logoStyles = {
  borderRadius: "50%",
  display: "block",
  margin: "auto"
};

export default function MainLogo(props) {
  const { requesting } = props;
  const logo = (
    <img
      className="mainLogo"
      src={Logo}
      alt="Stephen Foster Story logo"
      style={logoStyles}
    />
  );
  const logoStartPosition = `${window.innerHeight / 5}px`;
  const idle = useSpring({
    from: { transform: `translate3d(0,${logoStartPosition},0)`, opacity: 0 },
    to: { transform: `translate3d(0,0px,0)`, opacity: 1 }
  });
  const _requesting = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(720deg)" },
    config: { tension: 210, friction: 90, precision: 0 },
    reset: true
  });
  if (!requesting) {
    return <animated.div style={idle}>{logo}</animated.div>;
  } else {
    return <animated.div style={_requesting}>{logo}</animated.div>;
  }
}
