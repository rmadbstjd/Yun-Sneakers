import React, { useState } from "react";
import { addUserAddress } from "../../../../api/myPage";
import UIAddUserAddressForm from "../UIUserAddrsesForm";
import useGetUserAddress from "./../../../../hooks/useGetUserAddress";
import { useTextInputs, useNumberInputs } from "../../../../hooks/useInputs";
const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;

const Container = ({ type, setDefaultAddress }) => {
  const [address] = useGetUserAddress();
  const { state: place, handleChange: setPlace } = useTextInputs(
    address?.place,
    30
  );
  const { state: receiver, handleChange: setReceiver } = useTextInputs(
    address?.receiver,
    30
  );
  const { state: detail, handleChange: setDetail } = useTextInputs(
    address?.detail,
    50
  );
  const { state: firstPhoneNum, handleChange: setFirstPhoneNum } =
    useNumberInputs(address?.phoneNumber1, 3);
  const { state: middlePhoneNum, handleChange: setMiddlePhoneNum } =
    useNumberInputs(address?.phoneNumber2, 4);
  const { state: lastPhoneNum, handleChange: setLastPhoneNum } =
    useNumberInputs(address?.phoneNumber3, 4);
  const [placeAddress, setPlaceAddress] = useState(address?.address);
  const [postCode, setPostCode] = useState(address?.postCode);
  const [defaultAddress] = useState(false);
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
    if (regex.test(e.target.value)) setPlace(e.target.value);
  };

  const changeReceiverName = (e) => {
    if (regex.test(e.target.value)) setReceiver(e.target.value);
  };

  const changeDetailName = (e) => {
    if (regex.test(e.target.value));
    setDetail(e.target.value);
  };

  const changeFirstPhoneNumber = (e) => {
    setFirstPhoneNum(e.target.value);
  };
  const changeMiddlePhoneNumber = (e) => {
    setMiddlePhoneNum(e.target.value);
  };
  const changeLastPhoneNumber = (e) => {
    setLastPhoneNum(e.target.value);
  };
  const checkTextLength = (e) => {
    if (e.target.value.length >= 51) return;
    setRequestTextArea(e.target.value);
  };

  const addAddress = async () => {
    await addUserAddress(
      place,
      receiver,
      postCode,
      placeAddress,
      detail,
      firstPhoneNum,
      middlePhoneNum,
      lastPhoneNum
    );
  };

  return (
    <UIAddUserAddressForm
      place={place}
      receiver={receiver}
      detail={detail}
      firstPhoneNum={firstPhoneNum}
      middlePhoneNum={middlePhoneNum}
      lastPhoneNum={lastPhoneNum}
      postCode={postCode}
      setPostCode={setPostCode}
      placeAddress={placeAddress}
      setPlaceAddress={setPlaceAddress}
      setDetail={setDetail}
      changePlaceName={changePlaceName}
      changeReceiverName={changeReceiverName}
      changeDetailName={changeDetailName}
      changeFirstPhoneNumber={changeFirstPhoneNumber}
      changeMiddlePhoneNumber={changeMiddlePhoneNumber}
      changeLastPhoneNumber={changeLastPhoneNumber}
      defaultAddress={defaultAddress}
      setDefaultAddress={setDefaultAddress}
      addAddress={addAddress}
      requestedTermItem={requestedTermItem}
      showRequestedTermList={showRequestedTermList}
      requestTextArea={requestTextArea}
      showTextArea={showTextArea}
      showRequestBox={showRequestBox}
      checkTextLength={checkTextLength}
      clickRequestedTermBox={clickRequestedTermBox}
      setIsPopupOpen={setIsPopupOpen}
      isPopupOpen={isPopupOpen}
      closePostCode={closePostCode}
      type={type}
    />
  );
};

export default Container;
