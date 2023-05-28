import { useQuery } from "@tanstack/react-query";
import { getProductInfo } from "../api/product";
const useGetProductInfo = (id) => {
  const { data: productInfo } = useQuery(["edit", id], () =>
    getProductInfo(id)
  );

  return { productInfo };
};

export default useGetProductInfo;
