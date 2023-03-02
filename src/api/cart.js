import axios from "axios";
import { instance } from "./../utils/instance";
export default class Cart {
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
  }

  async getUserCarts() {
    const response = await instance.get("/cart", {});
    const data = response.data;

    if (data.success === "true") {
      return data;
    } else {
      return null;
    }
  }

  async updateUserCart(productId, size, quantity) {
    const response = await instance.put(`/carts/${productId}`, {
      quantity: quantity,
      size: size,
    });
    const data = response.data;
    return data;
  }

  async addUserCart(products, size) {
    const response = await instance.post(`/carts/${products.id}`, {
      product: products,
      quantity: 1,
      size,
    });
    const data = response.data;
    return data;
  }

  async deleteUserCart(productId, size) {
    return instance.delete(`/carts/${productId}`, {
      data: { size },
    });
  }
}
