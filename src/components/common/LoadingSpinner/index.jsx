import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import * as Style from "./styles";
const LoadingSpinner = ({ width, margin, children }) => {
  return (
    <Style.Layout width={width} margin={margin}>
      {children && <Style.Text>{children}</Style.Text>}
      <BeatLoader color="gray" height={15} width={5} radius={2} margin={2} />
    </Style.Layout>
  );
};

export default LoadingSpinner;
