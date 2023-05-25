import React from "react";
import Navbar from "../../../common/Navbar/UINavbar";
import UIForm from "../UIForm";
import { validateAddProductForm } from "../../../../utils/validateAddProductForm";
import Swal from "sweetalert2";
import { uploadImage } from "../../../../api/upload";
import { useNavigate } from "react-router-dom";
import { useProductInputs } from "../../../../hooks/useInputs";
import { addProduct } from "../../../../api/product";
const AddProductForm = () => {
  const { product, setProduct, onChangeProduct, file, onChangeFile } =
    useProductInputs();

  const navigate = useNavigate();

  const clickAddBtn = async (e) => {
    if (validateAddProductForm(file, product)) {
      const url = await uploadImage(file);
      addProduct(product, url);
      Swal.fire({
        icon: "success",
        title: "성공적으로 상품을 등록하였습니다.",
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
        file={file}
        onChangeFile={onChangeFile}
        product={product}
        type={"등록"}
        setProduct={setProduct}
        clickSubmitBtn={clickAddBtn}
        clickCancelBtn={clickCancelBtn}
        onChangeProduct={onChangeProduct}
      />
    </>
  );
};

export default AddProductForm;
