import axios from "axios";
import { instance } from "./../utils/instance";
export default class Order {
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

  async addOrderProducts(productId, date, count, coupon, size) {
    const state = "배송중";
    await instance.post(`/order`, {
      productId,
      date,
      count,
      state,
      coupon,
      size,
    });
  }

  async completeShipment(orderId) {
    instance.put(`/order`, {
      orderId,
    });
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
