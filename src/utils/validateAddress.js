import Swal from "sweetalert2";

export const validateAddress = (
  shipPlaceName,
  shipReceiver,
  shipPostCode,
  phoneNumInput1,
  phoneNumInput2,
  phoneNumInput3
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
  } else if (!phoneNumInput1 || !phoneNumInput2 || !phoneNumInput3) {
    Swal.fire({
      title: "핸드폰 번호를 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (phoneNumInput1.length !== 3) {
    Swal.fire({
      title: "핸드폰 번호를 정확하게 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (phoneNumInput2.length !== 4) {
    Swal.fire({
      title: "핸드폰 번호를 정확하게 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (phoneNumInput3.length !== 4) {
    Swal.fire({
      title: "핸드폰 번호를 정확하게 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  }
  return true;
};
