import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  font-family: "OTWelcomeRA";
  flex-direction: column;
  align-items: center;
  width: 100%;

  margin: 0px auto;
`;

export const Text = styled.div`
  width: 500px;
  height: 200px;
  margin-top: 180px;
  text-align: center;
`;

export const TextTitle = styled.div`
  font-size: 25px;
  font-weight: bolder;
  line-height: 150%;
  text-align: center;
`;

export const TextContent = styled.div`
  font-size: 15px;
  line-height: 140%;
  text-align: center;
  margin-top: 10px;
`;
export const Btn = styled.button`
  border: none;
  width: 250px;
  height: 50px;
  background: black;
  color: white;
  cursor: pointer;
`;
