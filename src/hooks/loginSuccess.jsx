import axios from "axios";

async function loginSuccess(setNickName, setUserId) {
  return axios({
    url: "http://localhost:3001/login/success",
    method: "GET",
    withCredentials: "ture",
  }).then((result) => {
    if (result.data.user) {
      setNickName(result.data.user.nickname);
      setUserId(result.data.user.userId);
      localStorage.setItem("isLogin", true);
    }
  });
}
export default loginSuccess;
