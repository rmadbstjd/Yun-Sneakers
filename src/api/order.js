import axios from "axios";
import { instance } from "./../utils/instance";
export default class Order {
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

  async addOrderProducts(productId, date, count, coupon, size) {
    const state = "배송중";
    const response = await instance.post(`/order`, {
      productId,
      date,
      count,
      state,
      coupon,
      size,
    });
    const data = response.data;
    return data;
  }

  async completeShipment(orderId) {
    const response = await instance.put(`/order`, {
      orderId,
    });
    const data = response.data;
    return data;
  }

  async getShipIsCompleted() {
    const response = await instance.get(`/order/completed`, {});
    const data = response.data;
    return data.reverse();
  }

  async getIsNotReviewdProducts() {
    const response = await instance.get(`/order/notreviewd`, {});
    const data = response.data;
    return data.reverse();
  }
}
