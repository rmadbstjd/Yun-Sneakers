import axios from "axios";
import { instance } from "./../utils/instance";
export default class Product {
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
  async searchProducts(keyword, sort, collectionName, priceOrder, page) {
    const response = await this.httpClient.get("/search", {
      params: { keyword, sort, collectionName, priceOrder, page, offset: 10 },
    });
    const data = response.data;

    const products = data.products;
    const count = data.count;
    return { products, count };
  }

  async getAllProducts(page) {
    console.log("page", page);
    const response = await this.httpClient.get("products/all", {
      headers: {
        page,
      },
    });
    const data = response.data;
    const products = data.products;
    const count = data.count;

    return { products, count };
  }
  async getNewProducts(currentPage) {
    if (!currentPage) currentPage = 1;
    const response = await this.httpClient.post("products/orderByNew", {
      currentPage,
    });
    const data = response.data;
    return data;
  }

  async getPopularProducts(currentPage) {
    if (!currentPage) currentPage = 1;
    const response = await this.httpClient.post("products/orderByPopular", {
      currentPage,
    });
    const data = response.data;
    return data;
  }

  async getSimilarProducts(category, productId) {
    const response = await this.httpClient.post("products/similar", {
      category,
      productId,
    });
    const data = response.data;
    return data;
  }

  async getProductInfo(id) {
    const response = await this.httpClient.get(`products/${id}`);
    const data = response.data;
    return data;
  }

  async addProduct(product, image) {
    return this.httpClient.post("/products", {
      id: product.id,
      name: product.title,
      category: product.category,
      size: product.size,
      price: product.price,
      image,
      description: product.description,
    });
  }

  async editProduct(product, image, productId) {
    return this.httpClient.put("/products", {
      id: product.id,
      name: product.title,
      category: product.category,
      size: product.size,
      price: product.price,
      image,
      description: product.description,
      productId,
    });
  }

  async deleteProduct(productId) {
    const response = await this.httpClient.delete(`/products`, {
      data: { productId },
    });
    const data = response.data;
    return data;
  }

  async getBrandsName() {
    const response = await this.httpClient.get("products/brandsName", {});
    const data = response.data;
    return data;
  }

  async getNotAnsweredQna() {
    const response = await this.httpClient.get("/qna/notanswered", {});
    const data = response.data;
    return data;
  }

  async getAnsweredQna() {
    const response = await this.httpClient.get("/qna/answered", {});
    const data = response.data;
    return data;
  }
  async addQna(productId, title, content, isSecret, dates, image) {
    const response = await instance.post(`/qna/${productId}`, {
      title,
      content,
      isSecret,
      dates,
      image,
    });

    const data = response.data;
    return data;
  }

  async modifyQna(productId, title, content, isSecret, dates, qnaId) {
    const response = await instance.put(`/qna/${productId}`, {
      title,
      content,
      isSecret,
      dates,
      qnaId,
    });
    const data = response.data;
    return data;
  }

  async answerQna(productId, qnaId, answer) {
    const response = await this.httpClient.put(`/qna/answer/${productId}`, {
      qnaId,
      answer,
    });
    const data = response.data;
    return data;
  }

  async getQna(productId, page) {
    const response = await this.httpClient.get(`/qna/${productId}`, {
      headers: {
        page,
      },
    });
    const data = response.data;
    const QnA = data.Qna;
    const count = data.count;
    return { QnA, count };
  }

  async deleteQna(productId, qnaId) {
    const response = await instance.delete(`/qna/${productId}`, {
      data: { qnaId },
    });
    const data = response.data;
    return data;
  }
}
