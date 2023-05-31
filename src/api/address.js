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
  try {
    const response = await instance.post(`/address`, {
      place: shipPlaceName,
      receiver: shipReceiver,
      postCode: shipPostCode,
      address: shipAddress,
      addressDetail: shipAddressDetail,
      phoneNumber1: String(firstPhoneNum),
      phoneNumber2: String(middlePhoneNum),
      phoneNumber3: String(lastPhoneNum),
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
};

export const getUserAddress = async () => {
  try {
    const response = await instance.get("/address", {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
};

export const deleteUserAddress = async () => {
  try {
    const response = await instance.delete(`/address`, {});
    if (response.statusText) {
      return true;
    }
  } catch (erroor) {
    return false;
  }
};
