import { instance } from "./../utils/instance";

export async function addOrderProducts(productId, date, count, coupon, size) {
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

export async function completeShipment(orderId) {
  instance.put(`/order`, {
    orderId,
  });
}

export async function getShipIsCompleted() {
  const response = await instance.get(`/order/completed`, {});
  const data = response.data;
  return data;
}

export async function getIsNotReviewdProducts() {
  const response = await instance.get(`/order/notreviewd`, {});
  const data = response.data;
  return data;
}
