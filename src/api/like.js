import axios from "axios";
export default class Like {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://localhost:3001/api",
      },
      {
        withCredentials: true,
      }
    );
  }
  async pushLike(productId) {
    return this.httpClient.post(`/like/${productId}`, {
      email: this.email,
    });
  }
  async isLike(productId) {
    return this.httpClient
      .get(`/like/isLike/${productId}`, {})
      .then((res) => res.data.result);
  }
  async getLikeProduct() {
    return this.httpClient
      .get(`/like/products`, {})
      .then((res) => res.data.result);
  }
}
