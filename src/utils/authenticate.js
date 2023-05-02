import jwt_decode from "jwt-decode";

async function authenticate(setNickName, setUserId) {
  const token = localStorage.getItem("accessToken");
  const info = token && jwt_decode(token);
  setNickName(info?.nickname || "GUEST");
  setUserId(info?.id);
}
export default authenticate;
