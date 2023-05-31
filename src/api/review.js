import axios from "axios";
import { instance } from "../utils/instance";
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export const getProductReviews = async (id, page) => {
  try {
    const response = await httpClient.get(`/review/${id}`, {
      headers: {
        page,
      },
    });
    if (response.statusText) {
      const reviews = response.data.reviews;
      const count = response.data.count;
      return { reviews, count };
    }
  } catch (error) {
    return false;
  }
};

export const getUserWrittenReviews = async () => {
  try {
    const response = await instance.get(`/review`, {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
};

export const deleteProductReview = async (orderId) => {
  try {
    const response = await instance.delete(`/review`, {
      data: { orderId },
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};

export const addProductReview = async (
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
) => {
  try {
    const response = await instance.post(`/review`, {
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
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};
