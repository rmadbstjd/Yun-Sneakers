import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "../api/address";
const useGetUserAddress = () => {
  const {
    isLoading,
    data: address,
    refetch,
    isError,
  } = useQuery(["address"], () => getUserAddress(), {});

  return { isLoading, address, refetch, isError };
};

export default useGetUserAddress;
