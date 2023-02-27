import axios from "axios";

async function authenticate(setNickName, setUserId) {
  return axios({
    url: "https://weeklyrun.site/login/success",
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
export default authenticate;
