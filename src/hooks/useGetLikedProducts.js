import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLikedProducts } from "../api/like";

export const useGetLikedProducts = (props) => {
  const [count, setCount] = useState(0);
  const {
    isLoading,
    data: products,
    refetch,
  } = useQuery(["like"], () => getLikedProducts());
  useEffect(() => {
    if (products) {
      setCount(products?.length);
    }
  }, [products]);

  return { isLoading, count, products, refetch };
};
