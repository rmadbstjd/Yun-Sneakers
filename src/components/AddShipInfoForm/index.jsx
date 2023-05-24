import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { addUserAddress, getUserAddress } from "../../api/myPage";
import Layout from "./Layout";
const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;

const AddShipInfoForm = ({ type, setDefaultAddress }) => {
  const { data: address } = useQuery(["address"], () => getUserAddress());
  const [inputs, setInputs] = useState({
    place: "",
    receiver: "",
    postCode: "",
    address: "",
    detail: "",
    firstPhoneNum: "",
    middlePhoneNum: "",
    lastPhoneNum: "",
    defaultAddress: "",
  });

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
    if (regex.test(e.target.value))
      setInputs({ ...inputs, place: e.target.value });
  };

  const changeReceiverName = (e) => {
    if (regex.test(e.target.value))
      setInputs({ ...inputs, receiver: e.target.value });
  };

  const changeDetailName = (e) => {
    if (regex.test(e.target.value));
    setInputs({ ...inputs, detail: e.target.value });
  };

  const validatePhoneNumber = (e, field) => {
    const number = e.target.value.replace(/[^0-9]/g, "");
    if (number.length >= 5) return;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [field]: number,
    }));
  };
  const checkTextLength = (e) => {
    if (e.target.value.length >= 51) return;
    setRequestTextArea(e.target.value);
  };

  const addAddress = async () => {
    await addUserAddress(
      inputs.place,
      inputs.receiver,
      inputs.postCode,
      inputs.address,
      inputs.detail,
      inputs.firstPhoneNum,
      inputs.middlePhoneNum,
      inputs.lastPhoneNum
    );
  };

  useEffect(() => {
    if (address) {
      setInputs({
        ...inputs,
        place: address.place,
        receiver: address.receiver,
        firstPhoneNum: address.phoneNumber1,
        middlePhoneNum: address.phoneNumber2,
        lastPhoneNum: address.phoneNumber3,
        address: address.address,
        detail: address.addressDetail,
        postCode: address.postCode,
      });
    }
  }, [address]);
  return (
    <Layout
      inputs={inputs}
      setInputs={setInputs}
      changePlaceName={changePlaceName}
      changeReceiverName={changeReceiverName}
      changeDetailName={changeDetailName}
      validatePhoneNumber={validatePhoneNumber}
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

export default AddShipInfoForm;
