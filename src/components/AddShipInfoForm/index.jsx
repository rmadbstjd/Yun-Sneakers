import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";
import { addUserAddress, getUserAddress } from "../../api/myPage";
import * as Style from "./styles";
import PopupPostCode from "./PostPopUp/PopupPostCode";
import PopupDom from "./PostPopUp/PopupDom";
import userInfoStore from "../../store/userInfoStore";
import Button from "../common/button";

const requestedTermList = [
  "배송시 요청사항을 선택해 주세요",
  "부재시 문앞에 놓아주세요",
  "부재시 경비실에 맡겨 주세요.",
  "부재시 전화 또는 문자 주세요",
  "택배함에 넣어 주세요.",
  "직접입력",
];

const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;

const AddShipInfoForm = ({ type, setDefaultAddress }) => {
  const { data: address } = useQuery(["address"], () => getUserAddress());

  const {
    shipPlaceName,
    setShipPlaceName,
    shipReceiver,
    setShipReceiver,
    shipPostCode,
    setShipPostCode,
    shipAddress,
    setShipAddress,
    firstPhoneNum,
    middlePhoneNum,
    lastPhoneNum,
    setFirstPhoneNum,
    setMiddlePhoneNum,
    setLastPhoneNum,
    defaultAddress,
    shipAddressDetail,
    setShipAddressDetail,
  } = userInfoStore();

  const [showRequestedTermList, setShowRequestedTermList] = useState(false);
  const [requestedTermItem, setRequestedTermItem] =
    useState("배송시 요청사항을 선택해 주세요");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requestTextArea, setRequestTextArea] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const clickRequestedTermBox = (item) => {
    setRequestedTermItem(item);
    setShowRequestedTermList(false);
    if (item === "직접입력") setShowTextArea(true);
    else setShowTextArea(false);
  };

  const showRequestBox = () => {
    setShowRequestedTermList((prev) => !prev);
  };

  const changePlaceName = (e) => {
    if (regex.test(e.target.value)) setShipPlaceName(e.target.value);
  };

  const changeReceiverName = (e) => {
    if (regex.test(e.target.value)) setShipReceiver(e.target.value);
  };

  const validateFirstPhoneNum = (e) => {
    const number = e.target.value.replace(/[^0-9]/g, "");
    if (number.length >= 4) return;
    setFirstPhoneNum(number);
  };

  const validateMiddlePhoneNum = (e) => {
    const number = e.target.value.replace(/[^0-9]/g, "");
    if (number.length >= 5) return;
    setMiddlePhoneNum(number);
  };

  const validateLastPhoneNum = (e) => {
    const number = e.target.value.replace(/[^0-9]/g, "");
    if (number.length >= 5) return;
    setLastPhoneNum(number);
  };

  const checkTextLength = (e) => {
    if (e.target.value.length >= 51) return;
    setRequestTextArea(e.target.value);
  };

  const addAddress = async () => {
    await addUserAddress(
      shipPlaceName,
      shipReceiver,
      shipPostCode,
      shipAddress,
      shipAddressDetail,
      firstPhoneNum,
      middlePhoneNum,
      lastPhoneNum
    );
  };

  useEffect(() => {
    if (address) {
      setShipPlaceName(address.place);
      setShipReceiver(address.receiver);
      setFirstPhoneNum(address.phoneNumber1);
      setMiddlePhoneNum(address.phoneNumber2);
      setLastPhoneNum(address.phoneNumber3);
      setShipAddress(address.address);
      setShipAddressDetail(address.addressDetail);
      setShipPostCode(address.postCode);
    }
  }, [address]);

  return (
    <Style.Container>
      <Style.Content>
        <Style.Item>배송지명</Style.Item>
        <Style.DeliveryAddress
          type="text"
          maxLength={10}
          value={shipPlaceName}
          onChange={(e) => changePlaceName(e)}
        ></Style.DeliveryAddress>
      </Style.Content>
      <Style.Content>
        <Style.Item>수령인</Style.Item>
        <Style.DeliveryAddress
          type="text"
          maxLength={10}
          value={shipReceiver}
          onChange={(e) => changeReceiverName(e)}
        ></Style.DeliveryAddress>
      </Style.Content>
      <Style.AddressContainer>
        <Style.AddressItem>배송지</Style.AddressItem>
        <Style.SearchContainer>
          <Style.Search>
            <Style.AddressNumber>{shipPostCode}</Style.AddressNumber>
            <Button
              border={"solid gray 0px"}
              width={"100px"}
              height={"37px"}
              background={"#bebebe"}
              hoverBackground={"#bebebe"}
              color={"black"}
              lineHeight={"330%"}
              margin={"0px 0px 0px 15px"}
              fontSize={"12px"}
              isShow={true}
              onClick={() => setIsPopupOpen((prev) => !prev)}
            >
              우편 번호 검색
            </Button>
          </Style.Search>
          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode onClose={closePostCode} type={type} />
              </PopupDom>
            )}
          </div>
          <Style.AddressInfo>{shipAddress}</Style.AddressInfo>
          <Style.MoreInfo
            type="text"
            placeholder="상세 주소 입력"
            value={shipAddressDetail}
            onChange={(e) => setShipAddressDetail(e.target.value)}
          ></Style.MoreInfo>
        </Style.SearchContainer>
      </Style.AddressContainer>
      <Style.PhoneNumberContainer>
        <Style.Item>연락처</Style.Item>

        <Style.Number
          type="text"
          value={firstPhoneNum}
          onChange={(e) => validateFirstPhoneNum(e)}
        />

        <AiOutlineMinus
          style={{ width: "15px", height: "15px", margin: "10px 1px 0px 3px" }}
        />
        <Style.Number
          type="text"
          value={middlePhoneNum}
          onChange={(e) => validateMiddlePhoneNum(e)}
        ></Style.Number>
        <AiOutlineMinus
          style={{ width: "15px", height: "15px", margin: "10px 1px 0px 3px" }}
        />
        <Style.Number
          type="text"
          value={lastPhoneNum}
          onChange={(e) => validateLastPhoneNum(e)}
        ></Style.Number>
      </Style.PhoneNumberContainer>
      {setDefaultAddress && (
        <Style.CheckBoxContainer>
          <Style.CheckBox
            margin={"2 0px"}
            type="checkbox"
            value={defaultAddress}
            onChange={(e) => addAddress(e)}
          />
          <Style.CheckBoxRight>기본 배송지로 설정</Style.CheckBoxRight>
        </Style.CheckBoxContainer>
      )}
      <Style.RequestBox onClick={showRequestBox}>
        {requestedTermItem}{" "}
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
            onChange={(e) => checkTextLength(e)}
            placeholder="내용을 입력해주세요.(최대 50자)"
          ></Style.TextArea>
          <Style.LetterCount>{requestTextArea.length}/50</Style.LetterCount>
        </>
      )}
    </Style.Container>
  );
};

export default AddShipInfoForm;
