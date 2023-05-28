import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 20px;
`;

export const InfoLayout = styled.div`
  width: 1504px;
  display: flex;
`;

export const InfoContainer = styled.div`
  width: 623px;
  display: flex;
  justify-content: flex-start;

  margin-left: 55px;
`;

export const Img = styled.div`
  width: 160px;
  height: 160px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const InfoContent = styled.div`
  margin-top: 4%;
  margin-left: 5%;
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
  width: 300px;
  display: flex;
`;
export const Price = styled.div`
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

export const QuantityLayout = styled.div`
  width: 300px;

  display: flex;
`;
export const QuantityContent = styled.div`
  display: flex;
  margin-top: 19%;
`;

export const Minus = styled.div`
  text-align: center;
  font-size: 20px;
  border: solid #d3d3d3 1px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #414141;
  line-height: 120%;
  font-size: 25px;
`;

export const Count = styled.div`
  text-align: center;
  font-size: 17px;
  border: solid gray 0px;
  width: 30px;
  height: 30px;
  color: #414141;
  line-height: 170%;
`;

export const Plus = styled.div`
  text-align: center;
  font-size: 20px;
  border: solid #d3d3d3 1px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: #414141;
  line-height: 150%;
`;

export const DeleteContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Delete = styled.div`
  border: solid gray 1px;
  width: 100px;
  height: 40px;
  margin-top: 50%;
  margin-left: 23%;
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

export const Input = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  border: 1.5px solid gainsboro;
  margin: 70px 0px 0px 9px;
`;
