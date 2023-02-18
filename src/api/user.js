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

  async loginCheck() {
    const response = await this.httpClient.get("/login/success", {});
    const data = response.data;
    return data;
  }
}
