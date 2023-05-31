import { instance } from "./../utils/instance";

export const getUserCarts = async () => {
  try {
    const response = await instance.get("/cart", {});
    const data = response.data;
    if (data.success) return data;
    else return false;
  } catch (error) {
    return false;
  }
};

export const getUserCheckedCarts = async () => {
  try {
    const response = await instance.get("/cart/check/products", {});
    if (response.statusText) {
      const data = response.data;
      if (data.success) return data;
      else return false;
    }
  } catch (error) {
    return false;
  }
};

export const updateUserCart = async (productId, size, quantity) => {
  try {
    const response = await instance.put(`/cart/${productId}`, {
      quantity,
      size,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};

export const checkProduct = async (productId, isChecked) => {
  try {
    const response = await instance.put(`/cart/check/${productId}`, {
      isChecked,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};

export const addUserCart = async (products, size) => {
  try {
    const response = await instance.post(`/cart/${products.id}`, {
      product: products,
      quantity: 1,
      size,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};

export const deleteUserCart = async (productId, size) => {
  try {
    const response = await instance.delete(`/cart/${productId}`, {
      data: { size },
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};
