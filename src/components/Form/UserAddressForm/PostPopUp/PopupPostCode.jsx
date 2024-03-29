import React from "react";
import DaumPostcode from "react-daum-postcode";
import styles from "./css/PopupPostCode.module.css";
const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    props.setPlaceAddress(fullAddress);
    props.setPostCode(data.zonecode);
    props.onClose();
  };

  return (
    <div
      className={
        props.type === "orderPage"
          ? styles.postCodeStyle1
          : styles.postCodeStyle2
      }
    >
      <DaumPostcode onComplete={handlePostCode} />
    </div>
  );
};

export default PopupPostCode;
