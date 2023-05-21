import Swal from "sweetalert2";
export const validateAddQnAForm = (title, content) => {
  if (title.length === 0) {
    Swal.fire({
      title: "문의 제목을 작성해주세요.",
      confirmButtonColor: "black",
    });
    return false;
  }
  if (content.length <= 4) {
    Swal.fire({
      title: "문의 내용을 형식에 맞게 작성해주세요.",
      confirmButtonColor: "black",
    });
    return false;
  }

  return true;
};
