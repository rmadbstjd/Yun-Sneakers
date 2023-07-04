import React from "react";
import * as Style from "./styles";
import convertStringToNumber from "../../../../utils/convertStringToNumber";
import HorizonLine from "../../../../components/common/HorizonLine";
const UICartProducts = ({
  handleSingleCheck,
  checkedProducts,
  productId,
  goToDetail,
  minusProductQuantity,
  productCount,
  plusProductQuantity,
  deleteProduct,
  item,
}) => {
  return (
    <Style.Container>
      <Style.InfoLayout>
        <Style.InputLayout>
          <Style.Input
            type="checkbox"
            onChange={(e) =>
              handleSingleCheck(
                e.target.checked,
                item.productId,
                item.price,
                item.quantity
              )
            }
            checked={checkedProducts.some(
              (checked) => checked.id === productId
            )}
          ></Style.Input>
        </Style.InputLayout>

        <Style.InfoContainer>
          <Style.Img
            style={{ backgroundImage: "url(" + `${item.image}` + ")" }}
            onClick={goToDetail}
          ></Style.Img>
          <Style.InfoContent>
            <Style.Name>{item.name}</Style.Name>
            <Style.Description>{item.description}</Style.Description>
            <Style.Size>[사이즈] {item.size}</Style.Size>
            <Style.Price fontSize={"18px"} marginTop={"3%"}>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </Style.Price>
          </Style.InfoContent>
        </Style.InfoContainer>
        <Style.QuantityLayout>
          <Style.QuantityContent>
            <Style.Minus onClick={minusProductQuantity}>-</Style.Minus>
            <Style.Count>{productCount}</Style.Count>
            <Style.Plus onClick={plusProductQuantity}>+</Style.Plus>
          </Style.QuantityContent>
        </Style.QuantityLayout>
        <Style.PriceContainer>
          <Style.Price2 fontSize={"20px"} fontWeight={"bolder"}>
            {convertStringToNumber(productCount * item.price)}원
          </Style.Price2>
        </Style.PriceContainer>

        <Style.DeleteContainer>
          <Style.Delete onClick={deleteProduct}>삭제하기</Style.Delete>
        </Style.DeleteContainer>
      </Style.InfoLayout>
      <HorizonLine width={"90vw"} border={"1px"} color={"gray"}></HorizonLine>
    </Style.Container>
  );
};

export default UICartProducts;
