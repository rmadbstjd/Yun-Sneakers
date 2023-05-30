import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "../api/address";
const useGetUserAddress = () => {
  const { data: address, refetch } = useQuery(["address"], () =>
    getUserAddress()
  );

  return { address, refetch };
};

export default useGetUserAddress;
