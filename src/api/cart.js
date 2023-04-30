import { instance } from "./../utils/instance";

export const getUserCarts = async () => {
  const response = await instance.get("/cart", {});
  const data = response.data;
  if (data.success) return data;
  else return null;
};

export const getUserCheckedCarts = async () => {
  const response = await instance.get("/cart/checked", {});
  const data = response.data;
  if (data.success) return data;
  else return null;
};

export const updateUserCart = async (productId, size, quantity) => {
  await instance.put(`/carts/${productId}`, {
    quantity,
    size,
  });
};

export const checkProduct = async (productId, isChecked) => {
  await instance.put(`/carts/${productId}/check`, {
    isChecked,
  });
};

export const addUserCart = async (products, size) => {
  await instance.post(`/carts/${products.id}`, {
    product: products,
    quantity: 1,
    size,
  });
};

export const deleteUserCart = async (productId, size) => {
  await instance.delete(`/carts/${productId}`, {
    data: { size },
  });
};
