import styled from "@emotion/styled";

export const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 18px;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5px;
  font-weight: bolder;
`;

export const SizeBox = styled.div`
  border: solid gray 1px;
  border-radius: 15px;
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 300%;
  margin: 10px;
  cursor: pointer;
  font-weight: bolder;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const Close = styled.div`
  width: 70px;
  margin-top: 40px;
  margin-left: 170px;
  height: 25px;
  text-align: center;
  cursor: pointer;
  background-color: black;
  border: solid black 0px;
  border-radius: 5px;
  line-height: 160%;
  color: white;
`;

export const AddressContainer = styled.div`
  border: solid black 1px;
  border-radius: 20px;
  width: 700px;
  height: 500px;
  z-index: 555;
  position: absolute;
  top: 47%;
  left: 48%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

export const AddressContent = styled.div`
  margin-left: 40px;
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

export const ProductContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 500px;
  height: 150px;
`;

export const QnAContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
`;

export const Img = styled.img`
  width: 250px;
  height: 250px;
  margin-top: -100px;
  margin-left: -60px;
`;

export const InfoContainer = styled.div`
  margin-left: 13px;
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

export const StarContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

export const StarTopText = styled.div`
  font-weight: bolder;
  margin: 10px 0px 5px 0px;
`;

export const StarBotText = styled.div`
  color: gray;
`;

export const Star = styled.div`
  margin-top: 10px;
`;

export const StarBtn = styled.div`
  border: ${(props) => `solid ${props.border} 1px`};
  border-radius: 10px;
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 250%;
  margin: 10px;
  background-color: ${(props) => props.backcolor};
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    color: #a5ba93;
  }
`;

export const TextArea = styled.textarea`
  margin-top: 10px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  resize: none;
  outline-color: black;
  background: #ececec;
`;

export const TextLength = styled.div`
  display: flex;
  margin: 10px 0px -10px 0px;
  justify-content: flex-end;
`;
