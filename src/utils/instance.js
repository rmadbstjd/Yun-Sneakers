import axios from "axios";

export const instance = axios.create({
  baseURL: "http://yunseong.shop/api",
  headers: { "Content-type": "application/json" }, // 요청시에 추가적으로 앞에 붙는 기본 URL 설정
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");

    //요청시 AccessToken 계속 보내주기
    if (!token) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
      return config;
    }

    if (config.headers && token) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      config.headers.authorization = accessToken;
      config.headers.refreshToken = refreshToken;
      return config;
    }

    // Do something before request is sent
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      const originalRequest = config;
      const refreshToken = localStorage.getItem("refreshToken");
      // token refresh 요청
      const { data } = await axios.post(
        `http://yunseong.shop/api/refresh`, // token refresh api
        {},
        { headers: { authorization: refreshToken } }
      );
      // 새로운 토큰 저장
      // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
      const { accessToken: newAccessToken } = data;
      localStorage.setItem("accessToken", newAccessToken);
      originalRequest.headers.authorization = newAccessToken;
      // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
      return axios(originalRequest);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);
