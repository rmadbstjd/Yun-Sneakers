import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 20px;
`;

export const InfoLayout = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const InfoContainer = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-start;
`;

export const Img = styled.div`
  min-width: 190px;
  height: 200px;
  width: 190px;
  height: 250px;
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

export const Price = styled.div`
  margin-top: 3%;
  font-size: 20px;
`;

export const QuantityLayout = styled.div`
  width: 50%;
  display: flex;
`;

export const Quantity = styled.div`
  width: 63%;
  display: flex;
  justify-content: center;
`;

export const QuantityContent = styled.div`
  display: flex;
  margin-left: -14%;
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
  width: 37%;
  display: flex;
  justify-content: center;
`;

export const Delete = styled.div`
  border: solid gray 1px;
  width: 80px;
  height: 40px;
  margin-top: 65px;
  margin-left: 7%;
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
  width: 100%;
  margin-top: -1%;
  border-bottom: 1px solid black;
  line-height: 0.1rem;
`;
