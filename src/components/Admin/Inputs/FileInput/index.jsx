import React from "react";
import * as Style from "./styles";
const FileInput = ({ value, onChange }) => {
  return (
    <Style.Container>
      <Style.Input
        type="file"
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        name="file"
        requiredvalue={value}
        onChange={onChange}
      />
    </Style.Container>
  );
};

export default FileInput;
