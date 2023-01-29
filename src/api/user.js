import axios from "axios";
export default class Login {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://localhost:3001",
      },
      {
        withCredentials: true,
      }
    );
  }

  async getSession() {
    const response = await this.httpClient.get("/session", {});
    const data = response.data;
    return data;
  }

  async signUp(id, pw, nickname) {
    const response = await this.httpClient.post("/signUp", {
      userId: id,
      password: pw,
      nickname,
    });
    if (response.status === 201) {
      console.log("회원가입 실패");
      return false;
    } else if (response.status === 200) {
      console.log("회원가입 성공");
      return true;
    }
  }
  /*(async login(id, pw) {
    const response = await this.httpClient.post("/login", {
      userId: id,
      password: pw,
    });
    const data = response.data.data;
    console.log("Data", data);
    const nickname = data.user.nickname;
    const userId = data.user.userId;
    return { userId, nickname };
  }*/

  async loginCheck() {
    const response = await this.httpClient.get("/login/success", {});
    const data = response.data;
  }
  /*axios({
    url: "http://localhost:3001/login/success",
    method: "GET",
    withCredentials: "ture",
  }).then((result) => {
    if (result.data.user) {
      setNickName(result.data.user.nickname);
      setUserId(result.data.user.userId);
    }
  });*/
}
