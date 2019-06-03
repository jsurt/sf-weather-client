import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

export default function WeatherResults(props) {
  const { success, error, data } = props;
  let summary, temperature, precipProbability;
  if (data !== null) {
    summary = data.currently.summary;
    temperature = data.currently.temperature;
    precipProbability = data.currently.precipProbability;
  }
  const string = "Getting date";
  // const characters = [...string].map((char, index) => {
  //   characters[index] = char;
  // });
  const [items, set] = useState([...string]);
  const transitions = useTransition(items, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    trail: 100
  });
  //console.log(characters);
  console.log(transitions);
  // const letters = transitions.map(({ item, key, props }) => {
  //   console.log(key);
  //   return (
  //     <animated.span key={key} style={props}>
  //       {item}
  //     </animated.span>
  //   );
  // });
  //console.log(letters);
  if (error) {
    return <h6>Error: {error}</h6>;
  } else if (success) {
    return (
      <div>
        <p>
          It is {temperature} &deg;F and {summary} in Bardstown with a{" "}
          {precipProbability * 100}% chance of rain
        </p>
      </div>
    );
  } else {
    return transitions.map(({ item, key, props }) => {
      console.log(key);
      return (
        <animated.span key={key} style={props}>
          {item}
        </animated.span>
      );
    });
  }
}
