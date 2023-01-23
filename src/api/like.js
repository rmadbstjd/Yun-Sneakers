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
    return this.httpClient.post(`/like/${productId}`, {
      email: this.email,
    });
  }
  async isLike(productId) {
    return this.httpClient
      .get(`/like/isLike/${productId}`, {
        headers: {
          email: this.email,
        },
      })
      .then((res) => res.data.result);
  }
  async getLikeProduct() {
    return this.httpClient
      .get(`/like/products`, {
        headers: {
          email: this.email,
        },
      })
      .then((res) => res.data.result);
  }
}
