import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "../api/cart";
import cartStore from "../store/cartStore";
export const useGetUserCart = (userId) => {
  const { initCartCount, plusCartCount } = cartStore();
  const { refetch, data: cartProducts } = useQuery(["cart", userId], () =>
    getUserCarts()
  );
  useEffect(() => {
    initCartCount();
    if (cartProducts) {
      plusCartCount(cartProducts?.products?.length);
    }
  }, [cartProducts]);

  return { refetch, cartProducts };
};
