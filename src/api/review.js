/*import axios from "axios";
export default class Review {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: process.env.REACT_APP_BASE_URL,
      },
      {
        withCredentials: true,
      }
    );
  }

  async getProductReviews(id, page) {
    const response = await this.httpClient.get(`/review/${id}`, {
      headers: {
        page,
      },
    });
    const data = response.data;
    const reviews = data.reviews;
    const count = data.count;
    return { reviews, count };
  }*/
import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

const getProductReviews = async (id, page) => {
  const { data } = await httpClient.get(`/review/${id}`, {
    headers: {
      page,
    },
  });
  const reviews = data.reviews;
  const count = data.count;
  return { reviews, count };
};

export default getProductReviews;
