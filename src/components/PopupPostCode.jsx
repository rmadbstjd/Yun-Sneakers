import React from "react";
import DaumPostcode from "react-daum-postcode";
import styles from "../components/css/PopupPostCode.module.css";
import useStore from "../store";
const PopupPostCode = (props) => {
  console.log("PostCode", props.type);
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const { setInfo, setShipPostCode, setShipAddress } = useStore();
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
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    setShipAddress(fullAddress);
    setShipPostCode(data.zonecode);
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
