import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const useGetUserInfo = () => {
  const token = localStorage.getItem("accessToken");
  const info = token && jwt_decode(token);
  const [nickName, setNickName] = useState("GUEST");
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (info) {
      setNickName(info.nickname);
      setUserId(info.id);
    }
  }, [info]);
  return { userId, nickName };
};
