import { useQuery } from "@tanstack/react-query";
import userApi from "../api/user";
async function CheckIsAdmin() {
  const { data } = useQuery(["admin"], () => userApi.isAdmin());
  return data?.isAdmin;
}
export default CheckIsAdmin;
