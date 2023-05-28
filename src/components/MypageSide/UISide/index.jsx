import React from "react";
import * as Style from "./styles";
const UISide = ({ nickName, itemArr, query, goToPage, setIsCheckedID }) => {
  return (
    <Style.Container>
      <Style.Title>마이 페이지</Style.Title>
      <Style.NickName>
        {nickName}
        <Style.Last>님</Style.Last>
      </Style.NickName>
      {itemArr.map((item) => (
        <Style.Item
          isChecked={item.params === query}
          key={item.id}
          onClick={() => {
            goToPage(item.title);
            setIsCheckedID(item.id);
          }}
        >
          {item.title}
        </Style.Item>
      ))}
    </Style.Container>
  );
};

export default UISide;
