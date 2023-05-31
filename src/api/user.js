import axios from "axios";
import { instance } from "../utils/instance";
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

const signUp = async (id, pw, nickname) => {
  try {
    const response = await httpClient.post("/signup", {
      userId: id,
      password: pw,
      nickname,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};

const login = async (userId, password) => {
  try {
    const response = await httpClient.post("/login", {
      userId,
      password,
    });
    if (response.statusText) {
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    }
  } catch (error) {
    return false;
  }
};

const logout = async () => {
  try {
    const response = await instance.post("/logout", {});
    if (response.statusText) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/");
    }
  } catch (error) {
    return false;
  }
};

const verifyAccessToken = async () => {
  try {
    const response = await instance.get("/user/token", {});
    if (response.statusText) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    return false;
  }
};

const isAdmin = async () => {
  try {
    const response = await instance.get("/user/admin", {});
    if (response.statusText) {
      const data = response.data;
      return data;
    }
  } catch (error) {
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
    if (response.statusText) {
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    }
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
