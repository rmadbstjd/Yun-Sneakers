import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "../api/cart";
import cartStore from "../store/cartStore";
export const useGetUserCart = (userId) => {
  const { initCartCount, plusCartCount } = cartStore();
  const {
    isLoading,
    refetch,
    data: cartProducts,
    isError,
  } = useQuery(["cart", userId], () => getUserCarts());
  useEffect(() => {
    initCartCount();
    if (cartProducts) {
      plusCartCount(cartProducts?.products?.length);
    }
  }, [cartProducts]);
  console.log("cartPrdocuts", cartProducts);
  console.log("에로", isError);
  return { isLoading, refetch, cartProducts, isError };
};
