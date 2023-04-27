import axios from "axios";
import { instance } from "../utils/instance";
export default class Login {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "https://weeklyrun.site/api",
      },
      {
        withCredentials: true,
      }
    );
  }

  async signUp(id, pw, nickname) {
    const response = await this.httpClient.post("/signUp", {
      userId: id,
      password: pw,
      nickname,
    });
    if (response.status === 400) return false;
    else if (response.status === 201) return true;
  }

  async login(id, pw) {
    const response = await this.httpClient.post("/login", {
      userId: id,
      password: pw,
    });
    const data = response.data;
    if (data.isLogin === false) {
      return false;
    }
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("isLogin", true);
    return data;
  }

  async logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("isLogin", false);
    window.location.replace("/");
  }

  async authToken() {
    const response = await instance.get("/user", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    const data = response.data;
    return data;
  }

  async isAdmin() {
    const response = await instance.get("/user/admin", {});
    const data = response.data;

    return data;
  }
  async refreshToken() {
    const response = await instance.post("/refresh", {
      headers: {
        Authorization: localStorage.getItem("refreshToken"),
      },
    });
    const data = response.data;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("isLogin", true);
    return data;
  }
}
