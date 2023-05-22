import React, { useState } from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../../api/upload";
import { addProduct } from "../../../../api/product";
import Swal from "sweetalert2";
import { validateAddProductForm } from "../../../../utils/validateAddProductForm";
const InputProduct = ({ newProduct, setNewProduct }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const onChangeFile = (e) => {
    const { files } = e.target;
    setFile(files && files[0]);
  };

  const clickAddBtn = async (e) => {
    if (validateAddProductForm(file, newProduct)) {
      const url = await uploadImage(file);
      addProduct(newProduct, url);
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

  const onChangeProduct = (e, value) => {
    const row = e.target.value;
    setNewProduct((product) => {
      product[value] = row;
    });
  };
  return (
    <>
      <Style.Container>
        <Style.FormContainer>
          <Style.BtnContainer>
            <Style.Title>새로운 상품 등록</Style.Title>

            <div>
              <Style.AddButton onClick={clickAddBtn}>등록</Style.AddButton>
              <Style.AddButton onClick={clickCancelBtn}>취소</Style.AddButton>
            </div>
          </Style.BtnContainer>
          <Style.ImageContainer>
            {file && <Style.Img src={URL.createObjectURL(file)}></Style.Img>}
          </Style.ImageContainer>
          <Style.ImageForm>
            <div>
              <Style.Input
                value={newProduct.image}
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                name="file"
                required
                onChange={onChangeFile}
              ></Style.Input>
            </div>
          </Style.ImageForm>
          <Style.Form>
            <Style.Input
              value={newProduct.title}
              type="text"
              onChange={(e) => onChangeProduct(e, "title")}
              placeholder="상품명을 입력해주세요."
            ></Style.Input>
          </Style.Form>
          <Style.Form>
            <Style.Input
              value={newProduct.price}
              type="text"
              onChange={(e) => onChangeProduct(e, "price")}
              placeholder="가격을 입력해주세요."
            ></Style.Input>
          </Style.Form>
          <Style.Form>
            <Style.Input
              value={newProduct.category}
              type="text"
              onChange={(e) => onChangeProduct(e, "category")}
              placeholder="카테고리를 입력해주세요. ex)나이키,Nike"
            ></Style.Input>
          </Style.Form>
          <Style.Form>
            <Style.Input
              type="text"
              value={newProduct.description}
              onChange={(e) => onChangeProduct(e, "description")}
              placeholder="상품 설명을 입력해주세요."
            ></Style.Input>
          </Style.Form>
          <Style.Form>
            <Style.Input
              value={newProduct.size}
              type="text"
              placeholder="사이즈를 입력해주세요.ex)230,235,240,245,250"
              onChange={(e) => onChangeProduct(e, "size")}
            ></Style.Input>
          </Style.Form>
        </Style.FormContainer>
      </Style.Container>
    </>
  );
};

export default InputProduct;
