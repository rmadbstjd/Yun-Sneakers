import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "../api/address";
const useGetUserAddress = () => {
  const {
    data: address,
    refetch,
    isError,
  } = useQuery(["address"], () => getUserAddress(), {});

  return { address, refetch, isError };
};

export default useGetUserAddress;
