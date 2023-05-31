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

export const Title = styled.span`
  width: 100%;
  font-size: 28px;
  text-align: center;
  font-family: "LINESeedKR-Bd";
  margin-top: 150px;
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

export const Text = styled.div`
color: red;
font-size: 12px;
margin-top : 3px;
height : 20px;
}`;

export const SubmitButton = styled.button`
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

export const Form = styled.form``;

export const ResultMessage = styled.div``;
