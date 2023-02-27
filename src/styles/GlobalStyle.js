import React from "react";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";

const style = css`
  ${reset}
  * {
  }
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "KorailRoundGothicBold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KorailRoundGothicBold.woff2")
      format("woff2");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: "LINESeedKR-Bd";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
