import React, { useState } from "react";
import Skycons from "react-skycons";
import { useTransition, animated } from "react-spring";

const formatIconString = icon => {
  const uppercase = icon.toUpperCase();
  const underscored = uppercase.split("-").join("_");
  return underscored;
};

const weatherDataStyles = {
  section: {
    border: "1px solid black"
  },
  span: {
    color: "#0000ff"
  }
};

export default function ResultsSuccess(props) {
  const { temperature, icon, precipProbability } = props.data.currently;
  const formattedIconStr = formatIconString(icon);
  const temp = `${temperature}${String.fromCharCode(176)}F `;
  const skycon = (
    <Skycons
      color="black"
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
  const [items] = useState([...spans]);
  const transitions = useTransition(items, item => item.key, {
    from: { position: "relative", left: 500, opacity: 0 },
    enter: { position: "relative", left: 0, opacity: 1 },
    trail: 250
  });
  return (
    <section style={weatherDataStyles.section}>
      {transitions.map(({ item, key, props }) => {
        return (
          <animated.span key={key} style={props}>
            {item}
          </animated.span>
        );
      })}
    </section>
  );
}
