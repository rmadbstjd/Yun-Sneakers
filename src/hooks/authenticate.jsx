import jwt_decode from "jwt-decode";

async function authenticate(setNickName, setUserId) {
  const token = localStorage.getItem("accessToken");
  const info = jwt_decode(token);
  setNickName(info.nickname);
  setUserId(info.id);
}
export default authenticate;
