import React from "react";

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",

        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    >
      <span style={{ background: "#fff" }}>{text}</span>
    </div>
  );
};

export default HorizonLine;
