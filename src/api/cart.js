import axios from "axios";
export default class Cart {
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

  async getCarts() {
    return this.httpClient.get("cart").then((res) => res.data);
  }
  async addCart() {
    return this.httpClient.post("/products/1/cart", {
      productId: 1,
      quantity: 1,
    });
  }
}
