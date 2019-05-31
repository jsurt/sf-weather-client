import React from "react";
import { Spring, Transition } from "react-spring/renderprops";
import { useTransition, animated } from "react-spring";
import logo from "../images/sf-logo-cropped.png";

const logoStyles = {
  borderRadius: "50%",
  display: "block",
  margin: "auto"
};

export default function MainLogo(props) {
  const [show, set] = React.useState(true);
  const logoStartPosition = `${window.innerHeight / 5}px`;
  const transitions = useTransition(show, null, {
    from: { transform: `translate3d(0,${logoStartPosition},0)`, opacity: 0 },
    enter: { transform: `translate3d(0,0px,0)`, opacity: 1 }
  });
  if (!props.requesting) {
    return transitions.map(
      ({ item, key, props }) =>
        item && (
          <animated.div key={null} style={props}>
            <img
              className="mainLogo"
              src={logo}
              alt="Stephen Foster Story logo"
              style={logoStyles}
            />
          </animated.div>
        )
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
            <div style={props}>
              <img
                className="mainLogo"
                src={logo}
                alt="Stephen Foster Story logo"
                style={logoStyles}
              />
            </div>
          </React.Fragment>
        )}
      </Spring>
    );
  }
}

// const mainLogo = (
//   <img style={logoStyles} src={logo} alt="Stephen Foster Story logo" />
// );

{
  /* <Transition items={show} from={{ opacity: 0 }} to={{ opacity: 1 }}>
{show => props => <div style={props}>{show}</div>}
</Transition> */
}
