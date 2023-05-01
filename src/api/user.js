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

const login = async (id, pw) => {
  try {
    const response = await httpClient.post("/login", {
      userId: id,
      password: pw,
    });
    const data = response.data;
    if (data.isLogin) {
      return false;
    }
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("isLogin", true);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.setItem("isLogin", false);
  window.location.replace("/");
};

const authToken = async () => {
  try {
    const response = await instance.get("/user", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
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

const refreshToken = async () => {
  try {
    const response = await instance.post("/refresh", {
      headers: {
        Authorization: localStorage.getItem("refreshToken"),
      },
    });
    const data = response.data;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("isLogin", true);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const userApi = {
  signUp,
  login,
  logout,
  authToken,
  isAdmin,
  refreshToken,
};
export default userApi;
