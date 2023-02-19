import Swal from "sweetalert2";
const OnValidateAddress = (
  shipPlaceName,
  shipReceiver,
  shipPostCode,
  phoneNumInput1,
  phoneNumInput2,
  phoneNumInput3
) => {
  if (!shipPlaceName) {
    Swal.fire("Any fool can use a computer");
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
  }
};

export default OnValidateAddress;
