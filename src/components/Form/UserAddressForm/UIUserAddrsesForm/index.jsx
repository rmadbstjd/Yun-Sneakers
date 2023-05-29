import React from "react";
import * as Style from "./styles";
import Input from "../Inputs/TextInput";
import AddressInput from "../Inputs/AddressInput";
import NumberInput from "../Inputs/NumberInput";
import CheckBoxInput from "../Inputs/CheckBoxInput";
import RequestInput from "../Inputs/RequestInput";
import Button from "../../../common/button";
const UIAddUserAddressForm = ({
  place,
  receiver,
  detail,
  firstPhoneNum,
  middlePhoneNum,
  lastPhoneNum,
  postCode,
  setPostCode,
  placeAddress,
  defaultAddress,
  setPlaceAddress,
  changePlaceName,
  changeReceiverName,
  changeDetailName,
  changeFirstPhoneNumber,
  changeMiddlePhoneNumber,
  changeLastPhoneNumber,
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
  setShowModal,
  refetch,
}) => {
  return (
    <Style.Container>
      <Input
        title={"배송지명"}
        maxLength={10}
        value={place}
        onChange={(e) => changePlaceName(e)}
      />
      <Input
        title={"수령인"}
        maxLength={10}
        value={receiver}
        onChange={(e) => changeReceiverName(e)}
      />
      <AddressInput
        title={"배송지"}
        postCode={postCode}
        setPostCode={setPostCode}
        placeAddress={placeAddress}
        setPlaceAddress={setPlaceAddress}
        address={placeAddress}
        detail={detail}
        onClick={() => setIsPopupOpen((prev) => !prev)}
        isPopupOpen={isPopupOpen}
        closePostCode={closePostCode}
        type={type}
        onChange={(e) => changeDetailName(e)}
      />
      <NumberInput
        title={"연락처"}
        first={firstPhoneNum}
        middle={middlePhoneNum}
        last={lastPhoneNum}
        changeFirstPhoneNum={(e) => changeFirstPhoneNumber(e)}
        changeMiddlePhoneNum={(e) => changeMiddlePhoneNumber(e)}
        changeLastPhoneNum={(e) => changeLastPhoneNumber(e)}
      />
      {setDefaultAddress && (
        <CheckBoxInput
          title={"기본 배송지로 설정"}
          value={defaultAddress}
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
      <Style.BtnContainer>
        <Button
          style={{
            border: "solid gray 1px",
            borderRadius: "15px",
            width: "70px",
            height: "30px",
            lineHeight: "190%",
            color: "black",
            background: "white",
            hoverBackground: "black",
            hoverColor: "white",
            margin: "0px 0px 0px 15px",
            fontSize: "12px",
          }}
          isShow={true}
          onClick={() => {
            addAddress();
            setShowModal(false);
            refetch();
          }}
        >
          저장
        </Button>
        <Button
          style={{
            border: "solid gray 1px",
            borderRadius: "15px",
            width: "70px",
            height: "30px",
            lineHeight: "190%",
            color: "black",
            hoverColor: "white",
            hoverBackground: "black",
          }}
          isShow={true}
          onClick={() => {
            setShowModal(false);
          }}
        >
          취소
        </Button>
      </Style.BtnContainer>
    </Style.Container>
  );
};

export default UIAddUserAddressForm;
