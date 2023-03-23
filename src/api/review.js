import axios from "axios";
export default class Review {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://localhost:3000/api",
      },
      {
        withCredentials: true,
      }
    );
  }

  async getProductReviews(id) {
    const response = await this.httpClient.get(`/review/${id}`);
    const data = response.data;
    return data;
  }
}
