import { instance } from "./../utils/instance";

export const getOrderedProducts = async () => {
  const response = await instance.get(`/order`, {});
  return response.data;
};

export const addUserAddress = async (
  shipPlaceName,
  shipReceiver,
  shipPostCode,
  shipAddress,
  shipAddressDetail,
  phoneNumInput1,
  phoneNumInput2,
  phoneNumInput3
) => {
  await instance.post(`/address`, {
    place: shipPlaceName,
    receiver: shipReceiver,
    postCode: shipPostCode,
    address: shipAddress,
    addressDetail: shipAddressDetail,
    phoneNumber1: String(phoneNumInput1),
    phoneNumber2: String(phoneNumInput2),
    phoneNumber3: String(phoneNumInput3),
  });
};

export const getUserAddress = async () => {
  const response = await instance.get("/address", {});
  if (response.data) {
    return response.data;
  }
  return false;
};

export const deleteUserAddress = async () => {
  await instance.delete(`/address`, {});
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

export const getUserReviews = async () => {
  const response = await instance.get(`/review`, {});
  return response.data;
};

export const deleteProductReview = async (orderId) => {
  await instance.delete(`/review`, {
    data: { orderId },
  });
};
