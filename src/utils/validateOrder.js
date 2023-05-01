import Swal from "sweetalert2";

export const validateOrder = (
  shipPlaceName,
  shipReceiver,
  shipPostCode,
  phoneNumInput1,
  phoneNumInput2,
  phoneNumInput3,
  card,
  checkItems,
  termsArr
) => {
  if (!shipPlaceName) {
    Swal.fire({
      title: "배송지를 입력해주세요.",
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
      title: "핸드폰번호를 입력해주세요.",
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
  } else if (card === "카드사를 선택해주세요.") {
    Swal.fire("카드사를 선택해주세요.");

    return;
  } else if (card === "카드사를 선택해주세요.") {
    Swal.fire({
      title: "카드사를 선택해주세요.",
      confirmButtonColor: "black",
    });
    return;
  } else if (checkItems.length !== termsArr.length) {
    Swal.fire({
      title: "약관 동의를 모두 선택해주세요.",
      confirmButtonColor: "black",
    });
    return;
  }
  return true;
};
