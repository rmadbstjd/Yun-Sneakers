import { instance } from "../utils/instance";

export const pushLike = async (productId, userId) => {
  await instance.post(`/like/${productId}`, {
    userId,
  });
};

export const isLikedProduct = async (productId) => {
  const response = await instance.get(`/like/${productId}`, {});
  const data = response.data;
  return data;
};

export const getLikedProducts = async () => {
  const response = await instance.get(`/like/products`, {});

  const data = response.data;
  return data;
};
