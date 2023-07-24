import { instance } from "../utils/instance";

export const pushLike = async (productId) => {
  try {
    const response = await instance.post(`/product/${productId}/like`, {});
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};

export const isLikedProduct = async (productId) => {
  try {
    const response = await instance.get(`/product/${productId}/like`, {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
};

export const getLikedProducts = async () => {
  try {
    const response = await instance.get(`/products/like`, {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
};
