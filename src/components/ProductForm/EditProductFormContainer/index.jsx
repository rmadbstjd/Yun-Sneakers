import React from "react";
import { uploadImage } from "../../../api/upload";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar/Container";
import Swal from "sweetalert2";
import { editProduct } from "../../../api/product";
import { validateAddProductForm } from "../../../utils/validateAddProductForm";
import UIForm from "../UIForm";
import { useProductInputs } from "../../../hooks/useInputs";
const EditProductForm = ({ productInfo }) => {
  const navigate = useNavigate();

  const { product, onChangeProduct, file, onChangeFile } =
    useProductInputs(productInfo);

  const clickEditBtn = async (e) => {
    if (validateAddProductForm(product.url, product)) {
      const url = await uploadImage(file);
      editProduct(product, url, productInfo.product.id);
      Swal.fire({
        icon: "success",
        title: "성공적으로 상품을 수정하였습니다.",
        confirmButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin/manage");
        }
      });
    }
  };
  const clickCancelBtn = () => {
    navigate("/admin/manage");
  };

  return (
    <>
      <Navbar />
      <UIForm
        product={product}
        onChangeProduct={onChangeProduct}
        file={file}
        type={"수정"}
        onChangeFile={onChangeFile}
        clickSubmitBtn={clickEditBtn}
        clickCancelBtn={clickCancelBtn}
      />
    </>
  );
};

export default EditProductForm;
