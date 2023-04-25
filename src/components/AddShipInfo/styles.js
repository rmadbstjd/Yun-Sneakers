import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Content = styled.div`
  display: flex;
  margin: 5px;
`;

export const Item = styled.div`
  border: solid black 0px;
  width: 129px;
  height: 40px;
  line-height: 240%;
`;

export const DeliveryAddress = styled.input`
  width: 310px;
  height: 35px;
`;

export const AddressContainer = styled.div`
  display: flex;
  margin: 5px;
`;

export const AddressItem = styled.div`
  border: solid black 0px;
  width: 129px;
  height: 160px;
  line-height: 240%;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Search = styled.div`
  display: flex;
`;

export const AddressNumber = styled.div`
  border: solid gray 1px;
  width: 200px;
  height: 35px;
  background-color: white;
  margin-bottom: 10px;
  line-height: 240%;
`;

export const SearchBtn = styled.div`
  border: solid gray 0px;
  width: 100px;
  height: 37px;
  background-color: #f5f5f5;
  line-height: 330%;
  margin-left: 15px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`;

export const AddressInfo = styled.div`
  border: solid gray 1px;
  width: 400px;
  height: 35px;
  background-color: white;
  line-height: 240%;
  font-size: 20px;
`;

export const MoreInfo = styled.input`
  width: 394px;
  height: 35px;
  margin-top: 10px;
`;

export const PhoneNumberContainer = styled.div`
  display: flex;
  margin-top: -25px;
`;

export const Number = styled.input`
  width: 60px;
  height: 25px;
  margin: 3px 0px 0px 4px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  margin-left: 16.5%;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-left: ${(props) => props.margin};
`;

export const CheckBoxRight = styled.div`
  line-height: 175%;
  margin-left: 7px;
  font-size: 14px;
`;

export const RequestBox = styled.div`
  border: solid #bebebe 1px;
  margin: 10px 0px 30px 132px;
  width: 400px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: white;
  line-height: 220%;
`;

export const RequestContainer = styled.div`
  border-left: solid #bebebe 1px;
  border-right: solid #bebebe 1px;
  border-bottom: solid #bebebe 1px;
  position: absolute;
  margin: 360px 0px 0px 132px;
  z-index: 999;
`;

export const Request = styled.div`
  border: solid #bebebe 0px;
  width: 400px;
  height: 35px;
  line-height: 240%;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #d4d4d4;
  }
`;

export const TextArea = styled.textarea`
  width: 398px;
  height: 100px;
  margin: -30px 0px 30px 132px;
  outline: none;
  background: #f8f8f8;
`;

export const LetterCount = styled.div`
  width: 322px;
  height: 15px;
  font-size: 13px;
  text-align: end;
  color: black;
  margin: -30px 0px 10px 212px;
`;
