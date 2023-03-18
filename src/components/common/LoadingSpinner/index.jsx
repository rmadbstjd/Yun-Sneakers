import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import * as Style from "./styles";
const LoadingSpinner = ({ width, margin }) => {
  return (
    <Style.Layout width={width} margin={margin}>
      <BeatLoader color="gray" height={15} width={5} radius={2} margin={2} />
    </Style.Layout>
  );
};

export default LoadingSpinner;
