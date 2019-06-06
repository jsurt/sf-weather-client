import React, { useState } from "react";
import Skycons from "react-skycons";
import { useSpring, useTransition, animated } from "react-spring";

const formatIconString = icon => {
  const uppercase = icon.toUpperCase();
  const underscored = uppercase.split("-").join("_");
  return underscored;
};

const weatherDataStyles = {
  section: {
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center"
  },
  span: {
    display: "inline-block",
    height: "50px",
    fontSize: "34px",
    fontFamily: "Raleway, sans-serif",
    color: "#333333"
  }
};

export default function ResultsSuccess(props) {
  const { temperature, icon, precipProbability } = props.data.currently;
  const formattedIconStr = formatIconString(icon);
  const temp = `${temperature}${String.fromCharCode(176)}F `;
  const skycon = (
    <Skycons
      color="#333333"
      icon={`${formattedIconStr}`}
      autoplay={true}
      style={{ width: "90px", height: "45px" }}
    />
  );
  const pp = `${precipProbability * 100}%`;
  const spans = [temp, skycon, pp].map((item, index) => {
    return (
      <span key={index} style={weatherDataStyles.span}>
        {item}
      </span>
    );
  });
  const spring = useSpring({
    from: { background: "#ffffff" },
    to: { background: "#eeeeee" }
  });
  const [items] = useState([...spans]);
  const transitions = useTransition(items, item => item.key, {
    from: { position: "relative", left: 500, opacity: 0 },
    enter: { position: "relative", left: 0, opacity: 1 },
    trail: 250
  });
  return (
    <animated.section style={{ ...spring, ...weatherDataStyles.section }}>
      {transitions.map(({ item, key, props }) => {
        return (
          <animated.span key={key} style={props}>
            {item}
          </animated.span>
        );
      })}
    </animated.section>
  );
}
