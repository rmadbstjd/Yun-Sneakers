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
    this.email = localStorage.getItem("email");
  }

  async getUserCarts() {
    const response = await this.httpClient.get("/cart", {});
    const data = response.data;

    if (data.success === "true") {
      return data;
    } else {
      return null;
    }
  }

  async getUserAddress() {
    const response = await this.httpClient.get("/address", {});
    const data = response.data;

    if (data) return data;
    else return false;
  }

  async updateUserCart(productId, size, quantity) {
    const response = await this.httpClient.put(`/carts/${productId}`, {
      quantity: quantity,
      size: size,
    });
    const data = response.data;
    return data;
  }

  async addUserCart(products, size) {
    const response = await this.httpClient.post(`/carts/${products.id}`, {
      product: products,
      quantity: 1,
      size,
    });
    const data = response.data;
    return data;
  }

  async deleteUserCart(productId, size) {
    return this.httpClient.delete(`/carts/${productId}`, {
      data: { size },
    });
  }
}
