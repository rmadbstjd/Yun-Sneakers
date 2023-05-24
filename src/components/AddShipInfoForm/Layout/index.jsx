import React from "react";
import * as Style from "./styles";
import Input from "../Inputs/TextInput";
import AddressInput from "../Inputs/AddressInput";
import NumberInput from "../Inputs/NumberInput";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import RequestInput from "../Inputs/RequestInput";
const Layout = ({
  inputs,
  setInputs,
  changePlaceName,
  changeReceiverName,
  changeDetailName,
  validatePhoneNumber,
  setDefaultAddress,
  addAddress,
  requestedTermItem,
  showRequestedTermList,
  requestTextArea,
  showTextArea,
  showRequestBox,
  checkTextLength,
  clickRequestedTermBox,
  setIsPopupOpen,
  isPopupOpen,
  closePostCode,
  type,
}) => {
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
        onChange={(e) => changeDetailName(e)}
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

export default Layout;
