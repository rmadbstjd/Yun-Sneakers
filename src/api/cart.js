import axios from "axios";
import { instance } from "./../utils/instance";
export default class Cart {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: process.env.REACT_APP_BASE_URL,
      },
      {
        withCredentials: true,
      }
    );
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

  async getUserCheckedCarts() {
    const response = await instance.get("/cart/checked", {});
    const data = response.data;

    if (data.success === "true") return data;
    else return null;
  }
  async updateUserCart(productId, size, quantity) {
    await instance.put(`/carts/${productId}`, {
      quantity,
      size,
    });
  }

  async checkProduct(productId, isChecked) {
    await instance.put(`/carts/${productId}/check`, {
      isChecked,
    });
  }
  async addUserCart(products, size) {
    await instance.post(`/carts/${products.id}`, {
      product: products,
      quantity: 1,
      size,
    });
  }

  async deleteUserCart(productId, size) {
    await instance.delete(`/carts/${productId}`, {
      data: { size },
    });
  }
}
