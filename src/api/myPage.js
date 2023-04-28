import axios from "axios";
import { instance } from "./../utils/instance";
export default class MyPage {
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

  async getOrderedProducts() {
    const response = await instance.get(`/order`, {});
    const data = response.data;
    return data && data.reverse();
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
    await instance.post(`/address`, {
      place: shipPlaceName,
      receiver: shipReceiver,
      postCode: shipPostCode,
      address: shipAddress,
      addressDetail: shipAddressDetail,
      phoneNumber1: String(phoneNumInput1),
      phoneNumber2: String(phoneNumInput2),
      phoneNumber3: String(phoneNumInput3),
    });
  }
  async getUserAddress() {
    const response = await instance.get("/address", {});
    const data = response.data;

    if (data) return data;
    else return false;
  }
  async deleteUserAddress() {
    await instance.delete(`/address`, {});
  }

  async addProductReview(
    image,
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
    await instance.post(`/review`, {
      image,
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
  }

  async getUserReviews() {
    const response = await instance.get(`/review`, {});
    const data = response.data;
    return data.reverse();
  }

  async deleteProductReview(orderId) {
    await instance.delete(`/review`, {
      data: { orderId },
    });
  }
}
