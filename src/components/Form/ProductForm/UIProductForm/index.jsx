import React from "react";
import * as Style from "./styles";
import FileInput from "../Inputs/FileInput";
import TextInput from "../Inputs/TextInput";
const UIProductForm = ({
  product,
  file,
  type,
  onChangeFile,
  clickSubmitBtn,
  clickCancelBtn,
  onChangeProduct,
}) => {
  return (
    <>
      <Style.Container>
        <Style.FormContainer>
          <Style.BtnContainer>
            <Style.Title>상품 {type}</Style.Title>
            <div>
              <Style.AddButton onClick={clickSubmitBtn}>{type}</Style.AddButton>
              <Style.AddButton onClick={clickCancelBtn}>취소</Style.AddButton>
            </div>
          </Style.BtnContainer>
          <Style.ImageContainer>
            {file && <Style.Img src={URL.createObjectURL(file)}></Style.Img>}
            {!file && product && <Style.Img src={product.url}></Style.Img>}
          </Style.ImageContainer>
          <FileInput value={product.image} onChange={onChangeFile} />
          <TextInput
            value={product.title}
            onChange={(e) => onChangeProduct(e, "title")}
            text="상품명을 입력해주세요."
          />
          <TextInput
            value={product.price}
            onChange={(e) => onChangeProduct(e, "price")}
            text="가격을 입력해주세요."
          />
          <TextInput
            value={product.category}
            onChange={(e) => onChangeProduct(e, "category")}
            text="카테고리를 입력해주세요. ex)나이키,Nike"
          />
          <TextInput
            value={product.description}
            onChange={(e) => onChangeProduct(e, "description")}
            text="상품 설명을 입력해주세요."
          />
          <TextInput
            value={product.size}
            onChange={(e) => onChangeProduct(e, "size")}
            text="사이즈를 입력해주세요.ex)230,235,240,245,250"
          />
        </Style.FormContainer>
      </Style.Container>
    </>
  );
};

export default UIProductForm;
