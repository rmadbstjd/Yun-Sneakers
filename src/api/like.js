import axios from "axios";
import { instance } from "../utils/instance";

export default class Like {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://yunseong.shop/api",
      },
      {
        withCredentials: true,
      }
    );
    this.token = localStorage.getItem("accessToken");
  }

  async pushLike(productId, userId) {
    await instance.post(
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

    const data = response.data;
    return data;
  }
}
