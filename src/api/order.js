import { instance } from "./../utils/instance";

export async function createOrder(productId, date, count, coupon, size) {
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

export async function completeDelivery(orderId) {
  instance.put(`/order`, {
    orderId,
  });
}

export async function getDeliveredProducts() {
  const response = await instance.get(`/order/completedproducts`, {});
  const data = response.data;
  return data;
}

export async function getNotReviewdProducts() {
  const response = await instance.get(`/order/notreviewdproducts`, {});
  const data = response.data;
  return data;
}
