import React from "react";
import * as Style from "./styles";
import Button from "../../../../common/button";
import PopupDom from "../../PostPopUp/PopupDom";
import PopupPostCode from "../../PostPopUp/PopupPostCode";
const AddressInput = ({
  title,
  postCode,
  setPostCode,
  placeAddress,
  setPlaceAddress,
  address,
  detail,
  onClick,
  isPopupOpen,
  closePostCode,
  type,
  onChange,
}) => {
  return (
    <Style.Container>
      <Style.Title>{title}</Style.Title>
      <Style.InputContainer>
        <Style.PostCodeLayout>
          <Style.PostCode>{postCode}</Style.PostCode>
          <Button
            style={{
              border: "solid gray 0px",
              width: "100px",
              height: "37px",
              background: "#bebebe",
              hoverBackground: "#bebebe",
              color: "black",
              lineHeight: "330%",
              margin: "0px 0px 0px 15px",
              fontSize: "12px",
            }}
            isShow={true}
            onClick={onClick}
          >
            우편 번호 검색
          </Button>
        </Style.PostCodeLayout>
        <div id="popupDom">
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode
                onClose={closePostCode}
                type={type}
                postCode={postCode}
                setPostCode={setPostCode}
                placeAddress={placeAddress}
                setPlaceAddress={setPlaceAddress}
              />
            </PopupDom>
          )}
        </div>
        <Style.Address>{address}</Style.Address>
        <Style.Detail
          type="text"
          placeholder="상세 주소 입력"
          value={detail}
          onChange={onChange}
        />
      </Style.InputContainer>
    </Style.Container>
  );
};

export default AddressInput;
