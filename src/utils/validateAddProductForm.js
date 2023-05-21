import Swal from "sweetalert2";

export const validateAddProductForm = (file, product) => {
  console.log("파일", file);
  console.log("상품", product);
  if (!file) {
    Swal.fire({
      title: "상품의 사진을 업로드해주세요.",
      confirmButtonColor: "black",
    });
    return false;
  } else if (!product.title) {
    Swal.fire({
      title: "상품명을 입력해주세요.",
      confirmButtonColor: "black",
    });
    return false;
  } else if (!product.price) {
    Swal.fire({
      title: "상품 가격을 입력해주세요.",
      confirmButtonColor: "black",
    });
    return false;
  } else if (!product.category) {
    Swal.fire({
      title: "상품의 카테고리를 입력해주세요.",
      confirmButtonColor: "black",
    });
    return false;
  } else if (!product.description) {
    Swal.fire({
      title: "상품 설명을 입력해주세요.",
      confirmButtonColor: "black",
    });
    return false;
  } else if (!product.size) {
    Swal.fire({
      title: "상품의 사이즈를 입력해주세요.",
      confirmButtonColor: "black",
    });
    return;
  }
  return true;
};
