import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserCart, deleteUserCart } from "../../../../api/cart";
import Swal from "sweetalert2";
import UICartProducts from "../UICartProducts";
const CartProducts = ({
  item,
  productId,
  refetch,
  handleSingleCheck,
  checkedProducts,
  setCheckedProducts,
}) => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(item.quantity);

  const plusProductQuantity = async () => {
    if (productCount >= 10) {
      Swal.fire({
        title: "최대 구매 개수는 10개입니다.",
        confirmButtonColor: "black",
      });
      return;
    }
    setProductCount((prev) => prev + 1);
    await updateUserCart(item.productId, item.size, productCount + 1);
    refetch();
  };

  const minusProductQuantity = async () => {
    if (productCount <= 1) return;
    setProductCount((prev) => prev - 1);
    await updateUserCart(item.productId, item.size, productCount - 1);
    refetch();
  };

  const deleteProduct = async () => {
    await deleteUserCart(item.productId, item.size);
    refetch();
    setCheckedProducts((prev) => prev.filter((el) => el.id !== item.productId));
  };

  const goToDetail = () => {
    navigate(`/products/${item.productId}`);
  };
  return (
    <UICartProducts
      handleSingleCheck={handleSingleCheck}
      checkedProducts={checkedProducts}
      productId={productId}
      goToDetail={goToDetail}
      minusProductQuantity={minusProductQuantity}
      productCount={productCount}
      plusProductQuantity={plusProductQuantity}
      deleteProduct={deleteProduct}
      item={item}
    />
  );
};

export default CartProducts;
