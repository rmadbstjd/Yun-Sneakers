import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../../../hooks/useGetUserInfo";
import { getUserCarts, checkProduct } from "../../../../api/cart";
import { useImmer } from "use-immer";
import Swal from "sweetalert2";
import UICartPage from "../UICartPage";
const CartPage = () => {
  const navigate = useNavigate();
  const { userId } = useGetUserInfo();
  const {
    isLoading,
    data: cartProducts,
    refetch,
  } = useQuery(["cart", userId], () => getUserCarts());

  const [checkedProducts, setCheckedProducts] = useImmer([]);
  const [price, setPrice] = useState(0);

  const handleSingleCheck = (checked, id, price, quantity) => {
    if (checked) {
      setCheckedProducts((draft) => {
        draft.push({ id, price, quantity });
        draft.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });
      });
    } else {
      for (let i = 0; i < checkedProducts?.length; i++) {
        if (checkedProducts[i]?.id === id) {
          checkProduct(id, false);
          setCheckedProducts((prev) => prev.filter((el) => el.id !== id));
        }
      }
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedProducts([]);
      for (let i = 0; i < cartProducts?.products?.length; i++) {
        setCheckedProducts((draft) => {
          checkProduct(cartProducts?.products[i]?.productId, true);
          draft.push({
            id: cartProducts?.products[i]?.productId,
            price: cartProducts?.products[i]?.price,
            quantity: cartProducts?.products[i]?.quantity,
          });
          draft.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          });
        });
      }
    } else {
      for (let i = 0; i < checkedProducts.length; i++) {
        checkProduct(checkedProducts[i].id, false);
      }
      setCheckedProducts([]);
    }
  };

  const clickToBuyBtn = () => {
    if (checkedProducts.length === 0) {
      Swal.fire({
        title: "상품을 선택해주세요",
        confirmButtonColor: "black",
      });
      return;
    }
    navigate("/shipment");
  };
  useEffect(() => {
    if (checkedProducts?.length === 0) {
      for (let i = 0; i < cartProducts?.products?.length; i++) {
        setCheckedProducts((draft) => {
          draft.push({
            id: cartProducts?.products[i]?.productId,
            price: cartProducts?.products[i]?.price,
            quantity: cartProducts?.products[i]?.quantity,
          });
          draft.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          });
        });
      }
    }
  }, [cartProducts]);
  useEffect(() => {
    if (checkedProducts?.length !== 0) {
      setPrice(0);
      for (let i = 0; i < checkedProducts?.length; i++) {
        checkProduct(checkedProducts[i]?.id, true);
        setPrice(
          (prev) =>
            prev + checkedProducts[i]?.price * checkedProducts[i]?.quantity
        );
      }
    } else {
      setPrice(0);
    }
  }, [checkedProducts]);

  useEffect(() => {
    if (checkedProducts?.length !== 0) {
      for (let i = 0; i < cartProducts?.products?.length; i++) {
        for (let j = 0; j < checkedProducts?.length; j++) {
          if (cartProducts?.products[i]?.productId === checkedProducts[j]?.id) {
            setCheckedProducts((draft) => {
              draft[j].quantity = cartProducts?.products[i]?.quantity;
              draft.sort((a, b) => {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                return 0;
              });
            });
          }
        }
        if (cartProducts?.products[i]?.productId === checkedProducts[i]?.id) {
          setCheckedProducts((draft) => {
            draft[i].quantity = cartProducts?.products[i]?.quantity;
            draft.sort((a, b) => {
              if (a.price > b.price) return -1;
              if (a.price < b.price) return 1;
              return 0;
            });
          });
        }
      }
    }
  }, [cartProducts]);
  return (
    <UICartPage
      isLoading={isLoading}
      handleAllCheck={handleAllCheck}
      checkedProducts={checkedProducts}
      cartProducts={cartProducts}
      refetch={refetch}
      handleSingleCheck={handleSingleCheck}
      setCheckedProducts={setCheckedProducts}
      price={price}
      navigate={navigate}
      clickToBuyBtn={clickToBuyBtn}
    ></UICartPage>
  );
};

export default CartPage;
