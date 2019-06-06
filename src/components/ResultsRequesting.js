import React, { useState } from "react";
import { useTransition, animated, config } from "react-spring";

const style = {
  container: { marginTop: "25px" },
  text: { fontFamily: "Raleway, sans-serif" }
};

export default function ResultsRequesting(props) {
  const string = "Getting data";
  const letters = [...string].map((item, index) => {
    return (
      <span key={index} style={style.text}>
        {item}
      </span>
    );
  });
  const [items] = useState([...letters]);
  const transitions = useTransition(items, item => item.key, {
    config: { tension: 170, friction: 19, precision: 0.01 },
    from: { position: "relative", top: 200, opacity: 0 },
    enter: { position: "relative", top: 0, opacity: 1 },
    trail: 150
  });
  return (
    <div style={style.container}>
      {transitions.map(({ item, key, props }) => {
        return (
          <animated.span key={key} style={props}>
            {item}
          </animated.span>
        );
      })}
    </div>
  );
}
