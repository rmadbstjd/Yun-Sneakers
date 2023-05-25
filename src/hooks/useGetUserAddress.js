import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "../api/myPage";
const useGetUserAddress = () => {
  const { data } = useQuery(["address"], () => getUserAddress());
  return [data];
};

export default useGetUserAddress;
