import axios from "axios";
export default class MyPage {
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

  async getOrderedProducts() {
    const response = await this.httpClient.get(`/order`, {});
    const data = response.data;
    return data.reverse();
  }

  async addUserAddress(
    shipPlaceName,
    shipReceiver,
    shipPostCode,
    shipAddress,
    shipAddressDetail,
    phoneNumInput1,
    phoneNumInput2,
    phoneNumInput3
  ) {
    const response = await this.httpClient.post(`/address`, {
      place: shipPlaceName,
      receiver: shipReceiver,
      postCode: shipPostCode,
      address: shipAddress,
      addressDetail: shipAddressDetail,
      phoneNumber1: String(phoneNumInput1),
      phoneNumber2: String(phoneNumInput2),
      phoneNumber3: String(phoneNumInput3),
    });
    const data = response.data;
    return data;
  }
  async getUserAddress() {
    const response = await this.httpClient.get("/address", {});
    const data = response.data;

    if (data) return data;
    else return false;
  }
  async deleteUserAddress() {
    const response = await this.httpClient.delete(`/address`, {});
    const data = response.data;
    return data;
  }

  async addProductReview(
    star,
    count,
    coupon,
    price,
    date,
    size,
    productId,
    orderId,
    content,
    rate
  ) {
    const response = await this.httpClient.post(`/review`, {
      star,
      count,
      coupon,
      price,
      size,
      date,
      productId,
      orderId,
      content,
      rate,
    });
    const data = response.data;
    return data;
  }

  async getUserReviews() {
    const response = await this.httpClient.get(`/review`, {});
    const data = response.data;
    return data.reverse();
  }

  async deleteProductReview(orderId) {
    const response = await this.httpClient.delete(`/review`, {
      data: { orderId },
    });
    const data = response.data;
    return data;
  }
}
