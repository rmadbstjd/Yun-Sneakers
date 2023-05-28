import styled from "@emotion/styled";
export const Container = styled.div`
  display: flex;
  margin: 5px;
`;

export const Title = styled.div`
  border: solid black 0px;
  width: 129px;
  height: 160px;
  line-height: 240%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostCodeLayout = styled.div`
  display: flex;
`;

export const PostCode = styled.div`
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

export const Address = styled.div`
  border: solid gray 1px;
  width: 400px;
  height: 35px;
  background-color: white;
  line-height: 240%;
  font-size: 20px;
`;

export const Detail = styled.input`
  width: 394px;
  height: 35px;
  margin-top: 10px;
`;
