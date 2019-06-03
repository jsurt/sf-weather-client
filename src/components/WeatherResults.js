import React from "react";
import { useSprings, animated } from "react-spring";

export default function WeatherResults(props) {
  const { success, error, data } = props;
  let summary, temperature, precipProbability;
  if (data !== null) {
    summary = data.currently.summary;
    temperature = data.currently.temperature;
    precipProbability = data.currently.precipProbability;
  }
  const string = "Getting data";
  const characters = [...string];
  const springs = useSprings(
    characters.length,
    characters.map(character => ({ opacity: character.opacity }))
  );
  const animatedText = ({ items }) => {
    const order = useRef(items.map((item, index) => index));
    const [springs, setSprings] = useSprings(items.length);
  };
  // animatedText(characters);
  console.log(springs);
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
    return (
      <animated.div style={springs}>
        <p>Getting data</p>
      </animated.div>
    );
  }
}
