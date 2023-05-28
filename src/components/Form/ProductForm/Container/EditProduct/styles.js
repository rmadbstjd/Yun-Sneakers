import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.div`
  width: 75%;
  margin-top: 100px;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
export const Input = styled.input`
  border: solid black 0px;
  width: 100%;
  height: 90%;
`;

export const AddButton = styled.button`
  margin: 8px 0px 8px 8px;
  height: 30px;
  border: solid black 0px;
  background-color: whitesmoke;
  color: black;
  cursor: pointer;
  &:hover {
    border: solid black 0px;
    background-color: black;
    color: white;
  }
`;
export const Img = styled.img``;

export const ImageForm = styled.div`
  border: solid black 1px;
  width: 100%;
  height: 50px;
  line-height: 300%;
`;

export const Form = styled.div`
  border: solid black 1px;
  width: 100%;
  height: 50px;
  line-height: 300%;
  display: flex;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bolder;
`;
