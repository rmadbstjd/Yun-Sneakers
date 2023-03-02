import axios from "axios";
import { instance } from "../utils/instance";
console.log("instance", instance);
export default class Like {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://localhost:3000/api",
      },
      {
        withCredentials: true,
      }
    );
    this.email = localStorage.getItem("email");
    this.token = localStorage.getItem("accessToken");
  }

  async pushLike(productId, userId) {
    const response = await instance.post(
      `/like/${productId}`,
      {
        userId,
      },
      {
        headers: {
          Authorization: this.token,
        },
      }
    );
    const data = response.data;
    return data;
  }

  async isLike(productId) {
    const response = await instance.get(`/like/isLike/${productId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    const data = response.data;
    return data;
  }

  async getLikedProducts() {
    const response = await instance.get(`/like/products`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    console.log("실행됨?");
    const data = response.data;
    return data;
  }
}
