import axios from "axios";
import { instance } from "../utils/instance";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

const signUp = async (id, pw, nickname) => {
  try {
    const response = await httpClient.post("/signUp", {
      userId: id,
      password: pw,
      nickname,
    });
    if (response.status === 400) return false;
    else if (response.status === 201) return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const login = async (userId, password) => {
  try {
    const response = await httpClient.post("/login", {
      userId,
      password,
    });
    const data = response.data;
    if (data.isLogin === false) return false;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const logout = async () => {
  try {
    await instance.post("/logout", {});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.replace("/");
  } catch (error) {
    console.error(error);
  }
};

const verifyAccessToken = async () => {
  try {
    const response = await instance.get("/user/token", {});
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const isAdmin = async () => {
  try {
    const response = await instance.get("/user/admin", {});
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const sendRefreshToken = async (userId) => {
  try {
    const response = await httpClient.post(
      "/refresh",
      { userId },
      { headers: { authorization: localStorage.getItem("refreshToken") } }
    );
    const data = response.data;
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  } catch (error) {
    return false;
  }
};

const userApi = {
  signUp,
  login,
  logout,
  verifyAccessToken,
  isAdmin,
  sendRefreshToken,
};
export default userApi;
