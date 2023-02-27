import axios from "axios";
export default class Order {
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

  async addOrderProducts(productId, date, count, coupon, size) {
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

  async completeShipment(orderId) {
    const response = await this.httpClient.put(`/order`, {
      orderId,
    });
    const data = response.data;
    return data;
  }

  async getShipIsCompleted() {
    const response = await this.httpClient.get(`/order/completed`, {});
    const data = response.data;
    return data.reverse();
  }

  async getIsNotReviewdProducts() {
    const response = await this.httpClient.get(`/order/notreviewd`, {});
    const data = response.data;
    return data.reverse();
  }
}
