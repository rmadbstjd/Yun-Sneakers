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
    const email = localStorage.getItem("email");
    return this.httpClient.post(`/like/${productId}`, {
      email: email,
    });
  }
  async isLike(productId) {
    const email = localStorage.getItem("email");
    return this.httpClient
      .post(`/like/isLike/${productId}`, {
        email: email,
      })
      .then((res) => res.data.result);
  }
  async getLikeProduct() {
    const email = localStorage.getItem("email");
    return this.httpClient
      .post(`/like/products`, {
        email: email,
      })
      .then((res) => res.data.result);
  }
}
