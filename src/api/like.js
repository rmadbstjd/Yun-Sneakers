import { instance } from "../utils/instance";
const token = localStorage.getItem("accessToken");

export const pushLike = async (productId, userId) => {
  await instance.post(
    `/like/${productId}`,
    {
      userId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const isLike = async (productId) => {
  const response = await instance.get(`/like/isLike/${productId}`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
  const data = response.data;
  return data;
};

export const getLikedProducts = async () => {
  const response = await instance.get(`/like/products`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  const data = response.data;
  return data;
};
