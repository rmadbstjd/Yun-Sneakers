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
    const productsArr = [];
    let sortedData;
    const response = await this.httpClient.get("/search", {
      params: { keyword, sort, collectionName, priceOrder },
    });

    for (let i = 0; i < response.data.length; i++) {
      sortedData = response.data[i];
      for (let i = 0; i < sortedData.length; i++) {
        productsArr.push(sortedData[i]);
      }
    }
    switch (sort) {
      case "0":
        let popularProducts = productsArr.sort(function (a, b) {
          if (a.likeNum > b.likeNum) return -1;
          if (a.likeNum < b.likeNum) return 1;
          return 0;
        });
        return popularProducts;
      case "1":
        let newProducts = productsArr.sort(function (a, b) {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });
        return newProducts;
      case "2":
        let highPriceProducts = productsArr.sort(function (a, b) {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });
        return highPriceProducts;
      case "3":
        let lowPriceProducts = productsArr.sort(function (a, b) {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        });
        return lowPriceProducts;
      default:
        break;
    }
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
