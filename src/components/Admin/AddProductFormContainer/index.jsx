import React, { useState } from "react";
import { useImmer } from "use-immer";
import Navbar from "../../common/Navbar/Container";
import { addProduct } from "../../../api/product";
import InputLayout from "../Layout";
import { validateAddProductForm } from "../../../utils/validateAddProductForm";
import Swal from "sweetalert2";
import { uploadImage } from "../../../api/upload";
import { useNavigate } from "react-router-dom";
const AddProductForm = () => {
  const [product, setProduct] = useImmer({
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  });
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const onChangeFile = (e) => {
    const { files } = e.target;
    setFile(files && files[0]);
  };

  const onChangeProduct = (e, value) => {
    const row = e.target.value;
    setProduct((product) => {
      product[value] = row;
    });
  };

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
      <InputLayout
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
