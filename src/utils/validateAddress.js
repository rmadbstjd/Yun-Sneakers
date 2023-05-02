import Swal from "sweetalert2";

export const validateAddress = (
  shipPlaceName,
  shipReceiver,
  shipPostCode,
  firstPhoneNum,
  middlePhoneNum,
  lastPhoneNum
) => {
  if (!shipPlaceName) {
    Swal.fire({
      title: "배송지명을 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (!shipReceiver) {
    Swal.fire({
      title: "수령인을 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (!shipPostCode) {
    Swal.fire({
      title: "우편번호를 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (!firstPhoneNum || !middlePhoneNum || !lastPhoneNum) {
    Swal.fire({
      title: "핸드폰 번호를 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (firstPhoneNum.length !== 3) {
    Swal.fire({
      title: "핸드폰 번호를 정확하게 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (middlePhoneNum.length !== 4) {
    Swal.fire({
      title: "핸드폰 번호를 정확하게 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (lastPhoneNum.length !== 4) {
    Swal.fire({
      title: "핸드폰 번호를 정확하게 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  }
  return true;
};
