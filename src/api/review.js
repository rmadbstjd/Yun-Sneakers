import axios from "axios";
import { instance } from "../utils/instance";
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export const getProductReviews = async (id, page) => {
  const { data } = await httpClient.get(`/review/${id}`, {
    headers: {
      page,
    },
  });
  const reviews = data.reviews;
  const count = data.count;
  return { reviews, count };
};

export const getUserWrittenReviews = async () => {
  const response = await instance.get(`/review`, {});
  return response.data;
};

export const deleteProductReview = async (orderId) => {
  await instance.delete(`/review`, {
    data: { orderId },
  });
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
};
