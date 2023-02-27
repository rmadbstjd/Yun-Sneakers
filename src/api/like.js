import axios from "axios";
export default class Like {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "https://weeklyrun.site/api",
      },
      {
        withCredentials: true,
      }
    );
    this.email = localStorage.getItem("email");
  }

  async pushLike(productId) {
    const response = await this.httpClient.post(`/like/${productId}`, {
      email: this.email,
    });
    const data = response.data;
    return data;
  }

  async isLike(productId) {
    const response = await this.httpClient.get(`/like/isLike/${productId}`, {});
    const data = response.data;
    return data;
  }

  async getLikedProducts() {
    const response = await this.httpClient.get(`/like/products`, {});
    const data = response.data;
    return data;
  }
}
