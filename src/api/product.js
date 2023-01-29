import axios from "axios";
export default class Product {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://localhost:3001/api",
      },
      {
        withCredentials: true,
      }
    );
  }
  async search(keyword, sort, collectionName, priceOrder) {
    const response = await this.httpClient.get("/search", {
      params: { keyword, sort, collectionName, priceOrder },
    });
    const data = response.data;

    return data;
  }

  async getProducts(currentPage) {
    if (!currentPage) {
      currentPage = 1;
    }
    return this.httpClient
      .post("products/orderByNew", {
        currentPage: currentPage,
      })
      .then((res) => res.data);
  }
  async getPopularProducts(currentPage) {
    if (!currentPage) {
      currentPage = 1;
    }
    return this.httpClient
      .post("products/orderByPopular", {
        currentPage: currentPage,
      })
      .then((res) => res.data);
  }
  async getSimilarProducts(category, productId) {
    return this.httpClient
      .post("products/similar", {
        category: category,
        productId: productId,
      })
      .then((res) => res.data);
  }
  async getProductInfo(id) {
    return this.httpClient.get(`products/${id}`).then((res) => res.data);
  }
  async addProduct(product, image) {
    return this.httpClient.post("/products", {
      id: product.id,
      name: product.title,
      category: product.category,
      size: product.size,
      price: product.price,
      image: image,
      description: product.description,
    });
  }
  async getBrandsName() {
    const response = await this.httpClient.get("products/brandsName", {});
    const data = response.data;
    return data;
  }
}
