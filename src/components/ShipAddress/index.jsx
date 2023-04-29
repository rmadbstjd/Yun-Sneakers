import React from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import userInfoStore from "../../store/userInfoStore";
const ShipAddress = () => {
  const { myPage } = userInfoStore();
  const {
    isLoading,
    error,
    data: address,
  } = useQuery(["address"], () => myPage.getUserAddress());
  if (!address) {
    return (
      <Style.Box>
        <p>등록된 배송지가 없습니다.</p>
        <p>배송지를 신규입력 해주세요.</p>
      </Style.Box>
    );
  } else {
    return (
      <div>
        <Style.Content>배송지 {address && address.place}</Style.Content>
        <Style.Content>수령인 {address && address.receiver}</Style.Content>
        <Style.Content>
          주소 {address && address.address} {address && address.postCode}{" "}
          {address && address.addressDetail}
        </Style.Content>
        <Style.Content>
          연락처 {address && address.phoneNumber1} -{" "}
          {address && address.phoneNumber2} - {address && address.phoneNumber3}
        </Style.Content>
      </div>
    );
  }
};

export default ShipAddress;
