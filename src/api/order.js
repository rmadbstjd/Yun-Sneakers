import axios from "axios";
export default class Order {
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

  async orderProducts(productId, date, count, coupon, size) {
    const state = "배송중";
    const response = await this.httpClient.post(`/order`, {
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

  async addShipComplete(orderId) {
    const response = await this.httpClient.put(`/order`, {
      orderId,
    });
    const data = response.data;
    return data;
  }

  async getShipComplete() {
    const response = await this.httpClient.get(`/order/completed`, {});
    const data = response.data;
    return data.reverse();
  }

  async getisNotReviewdProducts() {
    const response = await this.httpClient.get(`/order/notreviewd`, {});
    const data = response.data;
    return data.reverse();
  }
}
