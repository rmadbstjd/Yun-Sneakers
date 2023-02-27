import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import * as Style from "./styles";
import Swal from "sweetalert2";
const CartProduct = ({ item, refetch }) => {
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
    if (productCount <= 1) {
      return;
    }
    setProductCount((prev) => prev - 1);
    await cart.updateUserCart(item.productId, item.size, productCount - 1);
    refetch();
  };
  const deleteProduct = async () => {
    await cart.deleteUserCart(item.productId, item.size);
    refetch();
  };

  const goToDetail = () => {
    navigate(`/products/${item.productId}`);
  };

  return (
    <Style.Container>
      <Style.InfoLayout>
        <Style.InfoContainer>
          <Style.Img
            style={{ backgroundImage: "url(" + `${item.image}` + ")" }}
            onClick={goToDetail}
          ></Style.Img>
          <Style.InfoContent>
            <Style.Name>{item.name}</Style.Name>
            <Style.Description>{item.description}</Style.Description>
            <Style.Size>[사이즈] {item.size}</Style.Size>
            <Style.Price>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </Style.Price>
          </Style.InfoContent>
        </Style.InfoContainer>
        <Style.QuantityLayout>
          <Style.Quantity>
            <Style.QuantityContent>
              <Style.Minus onClick={minus}>-</Style.Minus>
              <Style.Count>{productCount}</Style.Count>
              <Style.Plus onClick={plus}>+</Style.Plus>
            </Style.QuantityContent>
          </Style.Quantity>
          <Style.DeleteContainer>
            <Style.Delete onClick={deleteProduct}>삭제하기</Style.Delete>
          </Style.DeleteContainer>
        </Style.QuantityLayout>
      </Style.InfoLayout>
      <Style.HorizonLine></Style.HorizonLine>
    </Style.Container>
  );
};

export default CartProduct;
