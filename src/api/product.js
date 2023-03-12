import axios from "axios";
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
  async searchProducts(keyword, sort, collectionName, priceOrder) {
    const response = await this.httpClient.get("/search", {
      params: { keyword, sort, collectionName, priceOrder },
    });
    const data = response.data;
    return data;
  }

  async getAllProducts() {
    const response = await this.httpClient.get("products/all", {});
    const data = response.data;

    return data;
  }
  async getProducts(currentPage) {
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
  async getBrandsName() {
    const response = await this.httpClient.get("products/brandsName", {});
    const data = response.data;
    return data;
  }
}
