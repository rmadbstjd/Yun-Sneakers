import { instance } from "../utils/instance";

export const pushLike = async (productId, userId) => {
  await instance.post(`/${productId}/like`, {
    userId,
  });
};

export const isLikedProduct = async (productId) => {
  const response = await instance.get(`/product/${productId}/like`, {});
  const data = response.data;
  return data;
};

export const getLikedProducts = async () => {
  const response = await instance.get(`/products/like`, {});

  const data = response.data;
  return data;
};
