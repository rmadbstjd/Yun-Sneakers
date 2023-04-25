import styled from "@emotion/styled";

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ReviewTitle = styled.div`
  font-size: 22px;
  font-weight: bolder;
  margin: 20px 0px 30px 0px;
`;

export const QnAContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
`;

export const Img = styled.img`
  width: 150px;
  height: 150px;
`;

export const InfoContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: 75%;
`;

export const ProductCategory = styled.div`
  font-weight: bolder;r
  margin-bottom: 10px;
  width: 75%;
`;

export const ProductName = styled.div`
  margin-bottom: 3px;
`;

export const ProductDescription = styled.div`
  margin-bottom: 3px;
  height: 122px;
`;

export const Size = styled.div``;
export const HorizonLine = styled.div`
  width: 95%;
  margin-top: 20px;
  border-bottom: 2px solid #d4d4d4;
  line-height: 0.1rem;
`;

export const TextArea = styled.textarea`
  margin-top: 10px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  resize: none;
  outline-color: black;
`;

export const TextLength = styled.div`
  display: flex;
  margin: 10px 0px -10px 0px;
  justify-content: flex-end;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
  margin-left: 35%;
  margin-top: 10px;
`;

export const Btn = styled.div`
  border: solid gray 1px;
  border-radius: 15px;
  width: 70px;
  height: 30px;
  line-height: 190%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
