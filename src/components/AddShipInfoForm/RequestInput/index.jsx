import React from "react";
import * as Style from "./styles";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
const requestedTermList = [
  "배송시 요청사항을 선택해 주세요",
  "부재시 문앞에 놓아주세요",
  "부재시 경비실에 맡겨 주세요.",
  "부재시 전화 또는 문자 주세요",
  "택배함에 넣어 주세요.",
  "직접입력",
];
const RequestInput = ({
  requestedTermItem,
  onClick1,
  clickRequestedTermBox,
  showRequestedTermList,
  showTextArea,
  requestTextArea,
  onChange,
}) => {
  return (
    <>
      <Style.RequestBox onClick={onClick1}>
        {requestedTermItem}
        <IoIosArrowDown style={{ margin: "10px 10px 0px 0px" }} />
      </Style.RequestBox>
      <Style.RequestContainer>
        {showRequestedTermList &&
          requestedTermList.map((item) => (
            <Style.Request
              onClick={() => clickRequestedTermBox(item)}
              key={item}
            >
              {item}
            </Style.Request>
          ))}
      </Style.RequestContainer>
      {showTextArea && (
        <>
          <Style.TextArea
            value={requestTextArea}
            onChange={onChange}
            placeholder="내용을 입력해주세요.(최대 50자)"
          ></Style.TextArea>
          <Style.LetterCount>{requestTextArea.length}/50</Style.LetterCount>
        </>
      )}
    </>
  );
};

export default RequestInput;
