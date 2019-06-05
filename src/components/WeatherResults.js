import React from "react";
import ResultsRequesting from "./ResultsRequesting";
import ResultsSuccess from "./ResultsSuccess";
import ResultsError from "./ResultsError";

export default function WeatherResults(props) {
  const { success, error, data } = props;
  if (error) {
    return <ResultsError error={error} />;
  } else if (success) {
    return <ResultsSuccess data={data} />;
  } else {
    return <ResultsRequesting />;
  }
}
