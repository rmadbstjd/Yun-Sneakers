import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 20px;
  width: 90vw;
`;

export const InfoLayout = styled.div`
  width: 90vw;
  display: flex;
`;

export const InfoContainer = styled.div`
  width: 47.1vw;
  display: flex;
  justify-content: flex-start;
`;

export const Img = styled.div`
  width: 50%;
  height: 20vh;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const InfoContent = styled.div`
  width: 100%;
`;

export const Name = styled.div`
  margin-top: 5%;
  font-weight: bold;
`;

export const Description = styled.div`
  margin-top: 1%;
  color: #3a3b3c;
  font-size: 15px;
`;

export const Size = styled.div`
  margin-top: 5%;
  font-size: 15px;
`;

export const PriceContainer = styled.div`
  display: flex;
  width: 15.1vw;
`;
export const Price = styled.div`
  margin: 0 auto;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const Price2 = styled.div`
  margin: 56px auto;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const QuantityLayout = styled.div`
  width: 10vw;
  display: flex;
`;
export const QuantityContent = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto;
`;

export const Minus = styled.div`
  text-align: center;
  font-size: 20px;
  border: solid #d3d3d3 1px;
  width: 1.5vw;
  height: 1.5vw;
  min-width: 25px;
  min-height: 25px;
  cursor: pointer;
  color: #414141;
  line-height: 120%;
  font-size: 25px;
`;

export const Count = styled.div`
  text-align: center;
  font-size: 17px;
  border: solid gray 0px;
  width: 1.5vw;
  height: 1.5vw;
  min-width: 25px;
  min-height: 25px;
  color: #414141;
  line-height: 170%;
`;

export const Plus = styled.div`
  text-align: center;
  font-size: 20px;
  border: solid #d3d3d3 1px;
  width: 1.5vw;
  height: 1.5vw;
  min-width: 25px;
  min-height: 25px;
  cursor: pointer;
  color: #414141;
  line-height: 150%;
`;

export const DeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 15.3vw;
`;

export const Delete = styled.div`
  border: solid gray 1px;
  width: 100px;
  height: 40px;
  margin: 50px auto;
  text-align: center;
  line-height: 280%;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const HorizonLine = styled.div`
  width: 116%;
  margin-top: 2%;
  border-bottom: 1px solid black;
  line-height: 0.1rem;
`;

export const InputLayout = styled.div`
  width: 2.7vw;
  display: flex;
`;

export const Input = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  border: 1.5px solid gainsboro;
  margin: 70px auto;
`;
