import axios from "axios";
import { createBrowserHistory } from "history";
import jwt_decode from "jwt-decode";
const history = createBrowserHistory();
const token = localStorage.getItem("accessToken");
const info = token && jwt_decode(token);

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
      return config;
    }

    if (config.headers && token) {
      const accessToken = localStorage.getItem("accessToken");
      config.headers.authorization = accessToken;

      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const config = error.config;
    const status = error.response.status;
    if (status === 401) {
      const originalRequest = config;
      const refreshToken = localStorage.getItem("refreshToken");

      // token refresh 요청
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/refresh`,
        { userId: info.id, userNickName: info.nickname },
        { headers: { authorization: refreshToken } }
      );
      const data = response.data;
      if (data.isSuccess) {
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.authorization = newAccessToken;
      } else {
        console.log("너야?");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history.push("/login");
        return Promise.reject(error);
      }
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
