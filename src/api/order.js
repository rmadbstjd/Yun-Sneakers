import { instance } from "./../utils/instance";

export async function createOrder(productId, date, count, coupon, size) {
  try {
    const state = "배송중";
    const response = await instance.post(`/order`, {
      productId,
      date,
      count,
      state,
      coupon,
      size,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
}

export async function completeDelivery(orderId) {
  try {
    const response = instance.put(`/order`, {
      orderId,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
}

export async function getDeliveredProducts() {
  try {
    const response = await instance.get(`/order/completedproducts`, {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getNotReviewdProducts() {
  try {
    const response = await instance.get(`/order/notreviewdproducts`, {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}
