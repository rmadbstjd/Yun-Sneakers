import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { addUserAddress, getUserAddress } from "../../api/myPage";
import * as Style from "./styles";
import Input from "./Input";
import AddressInput from "./AddressInput";
import NumberInput from "./NumberInput";
import CheckBoxInput from "./CheckBoxInput";
import RequestInput from "./RequestInput";
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
        detail: address.detail,
        postCode: address.postCode,
      });
    }
  }, [address]);
  return (
    <Style.Container>
      <Input
        title={"배송지명"}
        maxLength={10}
        value={inputs.place}
        onChange={(e) => changePlaceName(e)}
      />
      <Input
        title={"수령인"}
        maxLength={10}
        value={inputs.receiver}
        onChange={(e) => changeReceiverName(e)}
      />
      <AddressInput
        title={"배송지"}
        postCode={inputs.postCode}
        address={inputs.address}
        detail={inputs.detail}
        onClick={() => setIsPopupOpen((prev) => !prev)}
        isPopupOpen={isPopupOpen}
        closePostCode={closePostCode}
        type={type}
        setInputs={setInputs}
        inputs={inputs}
      />
      <NumberInput
        title={"연락처"}
        first={inputs.firstPhoneNum}
        middle={inputs.middlePhoneNum}
        last={inputs.lastPhoneNum}
        validateFirstPhoneNum={(e) => validatePhoneNumber(e, "firstPhoneNum")}
        validateMiddlePhoneNum={(e) => validatePhoneNumber(e, "middlePhoneNum")}
        validateLastPhoneNum={(e) => validatePhoneNumber(e, "lastPhoneNum")}
      />
      {setDefaultAddress && (
        <CheckBoxInput
          title={"기본 배송지로 설정"}
          value={inputs.defaultAddress}
          onChange={(e) => addAddress(e)}
        />
      )}
      <RequestInput
        requestedTermItem={requestedTermItem}
        onClick1={showRequestBox}
        showRequestedTermList={showRequestedTermList}
        requestTextArea={requestTextArea}
        showTextArea={showTextArea}
        onChange={(e) => checkTextLength(e)}
        clickRequestedTermBox={clickRequestedTermBox}
      />
    </Style.Container>
  );
};

export default AddShipInfoForm;
