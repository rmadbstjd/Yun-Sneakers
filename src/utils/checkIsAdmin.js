import { useQuery } from "@tanstack/react-query";
import userApi from "../api/user";
function CheckIsAdmin() {
  const { data } = useQuery(["admin"], () => userApi.isAdmin());
  if (data) return data.isAdmin;
}
export default CheckIsAdmin;
