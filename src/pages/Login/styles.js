import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: solid black 0px;
  width: 400px;
  height: 600px;
  margin: 0px auto;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  width: 100%;
  font-family: "Tenada";
  font-size: 24px;
  text-align: center;
  font-weight: 900;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  font-family: "LINESeedKR-Bd";
  padding: 10px 0px 10px 0px;
`;

export const Label = styled.label`
  color: ${(props) => (props.isAllowed === false ? "red" : "black")};
`;

export const InputValue = styled.input`
  width: 97%;
  border: none;
  height: 30px;
  border-bottom: ${(props) =>
    props.isAllowed === false ? "solid red 1px" : "solid black 1px"};
  &:focus {
    outline: none;
  }
`;

export const Text = styled.div`
color: red;
font-size: 12px;
}`;

export const SubmitBtn = styled.button`
  border: none;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isPassed === true ? "black" : "#ececec"};
  height: 50px;
  text-align: center;
  font-weight: bolder;
  font-size: 17px;
  color: white;
  line-height: 300%;
  cursor: ${(props) => (props.isPassed === true ? "pointer" : "default")};
`;

export const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 100px;
  width: 440px;
  height: 80px;
  border: soldid black 1px;
  border-radius: 50px;
  background-color: black;
  opacity: 0.7;
  color: white;
  text-align: center;
`;

export const SignUpLink = styled.span`
  margin-top: 15px;
  color: gray;
  text-decoration: underline;
  &:hover {
    color: black;
    cursor: pointer;
    font-weight: bolder;
  }
`;
