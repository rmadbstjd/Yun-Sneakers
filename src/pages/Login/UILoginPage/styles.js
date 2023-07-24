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
  font-family: "OTWelcomeRA";
`;

export const Title = styled.span`
  width: 100%;
  font-family: "OTWelcomeRA";
  font-size: 30px;
  text-align: center;
  font-weight: 900;
  cursor: pointer;
  margin-top: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  font-family: "OTWelcomeRA";
  padding: 10px 0px 10px 0px;
`;

export const Label = styled.label`
  color: "black";
`;

export const InputValue = styled.input`
  width: 97%;
  border: none;
  height: 30px;
  border-bottom: ${(props) =>
    props.isAllowed === null
      ? "solid black 1px"
      : props.isAllowed === true
      ? "solid black 1px"
      : "solid red 1px"};
  &:focus {
    outline: none;
  }
`;

export const Text = styled.span`
color: red;
font-size: 12px;
margin-top : 3px;
}`;

export const SubmitBtn = styled.button`
  border: none;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.isPassed ? "black" : "#ececec")};
  height: 50px;
  text-align: center;
  font-weight: bolder;
  font-size: 17px;
  color: white;
  line-height: 300%;
  cursor: ${(props) => (props.isPassed ? "pointer" : "default")};
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

export const Form = styled.form``;
