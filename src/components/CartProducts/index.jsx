import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import * as Style from "./styles";
import Swal from "sweetalert2";
import convertStringToNumber from "../../hooks/convertStringToNumber";

const CartProduct = ({
  item,
  productId,
  refetch,
  handleSingleCheck,
  checkedProducts,
  setCheckedProducts,
}) => {
  const { cart } = userInfoStore();
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(item.quantity);

  const plus = async () => {
    if (productCount >= 10) {
      Swal.fire({
        title: "최대 구매 개수는 10개입니다.",
        confirmButtonColor: "black",
      });
      return;
    }
    setProductCount((prev) => prev + 1);
    await cart.updateUserCart(item.productId, item.size, productCount + 1);
    refetch();
  };

  const minus = async () => {
    if (productCount <= 1) return;
    setProductCount((prev) => prev - 1);
    await cart.updateUserCart(item.productId, item.size, productCount - 1);
    refetch();
  };

  const deleteProduct = async () => {
    await cart.deleteUserCart(item.productId, item.size);
    refetch();
    setCheckedProducts((prev) => prev.filter((el) => el.id !== item.productId));
  };

  const goToDetail = () => {
    navigate(`/products/${item.productId}`);
  };

  return (
    <Style.Container>
      <Style.InfoLayout>
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
          checked={checkedProducts.some((checked) => checked.id === productId)}
        ></Style.Input>
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
            <Style.Minus onClick={minus}>-</Style.Minus>
            <Style.Count>{productCount}</Style.Count>
            <Style.Plus onClick={plus}>+</Style.Plus>
          </Style.QuantityContent>
        </Style.QuantityLayout>
        <Style.PriceContainer>
          <Style.Price
            fontSize={"20px"}
            fontWeight={"bolder"}
            marginTop={"20%"}
            marginLeft={"9%"}
          >
            {convertStringToNumber(productCount * item.price)}원
          </Style.Price>
        </Style.PriceContainer>

        <Style.DeleteContainer>
          <Style.Delete onClick={deleteProduct}>삭제하기</Style.Delete>
        </Style.DeleteContainer>
      </Style.InfoLayout>
      <Style.HorizonLine></Style.HorizonLine>
    </Style.Container>
  );
};

export default CartProduct;
