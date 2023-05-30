import { instance } from "../utils/instance";
export const addUserAddress = async (
  shipPlaceName,
  shipReceiver,
  shipPostCode,
  shipAddress,
  shipAddressDetail,
  firstPhoneNum,
  middlePhoneNum,
  lastPhoneNum
) => {
  await instance.post(`/address`, {
    place: shipPlaceName,
    receiver: shipReceiver,
    postCode: shipPostCode,
    address: shipAddress,
    addressDetail: shipAddressDetail,
    phoneNumber1: String(firstPhoneNum),
    phoneNumber2: String(middlePhoneNum),
    phoneNumber3: String(lastPhoneNum),
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
