import React, { useState, useEffect } from "react";
import { uploadImage } from "../../../api/upload";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import Navbar from "../../common/Navbar";
import Swal from "sweetalert2";
import { editProduct } from "../../../api/product";
import { validateAddProductForm } from "../../../utils/validateAddProductForm";
import convertStringToNumber from "../../../utils/convertStringToNumber";
import InputLayout from "../Inputs/InputLayout";
const EditProductForm = ({ productInfo }) => {
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
  const onChangeProduct = (e, column) => {
    const row = e.target.value;
    setProduct((product) => {
      product[column] = row;
    });
  };

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
  useEffect(() => {
    if (productInfo) {
      setProduct((product) => {
        product["url"] = productInfo.product.image;
        product["price"] = convertStringToNumber(productInfo.product.price);
        product["title"] = productInfo.product.name;
        product["size"] = productInfo.product.size;
        product["description"] = productInfo.product.description;
        product["category"] = productInfo.product.category;
      });
    }
  }, [productInfo]);

  return (
    <>
      <Navbar />
      <InputLayout
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
