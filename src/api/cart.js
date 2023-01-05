import axios from "axios";
export default class Cart {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://localhost:3001/api",
      },
      {
        withCredentials: true,
      }
    );
    this.email = localStorage.getItem("email");
  }

  async getCarts() {
    return this.httpClient
      .get("/cart", {
        headers: {
          email: this.email,
        },
      })
      .then((res) => res.data);
  }
  async getCartsTest() {
    const response = await this.httpClient.get("/cart", {
      headers: {
        email: this.email,
      },
    });
    const data = response.data;

    if (data.success === "true") {
      return data;
    } else {
      return null;
    }
  }
  async updateCart(productId, size, quantity) {
    const response = await this.httpClient.put(
      `/carts/${productId}`,
      {
        quantity: quantity,
        size: size,
      },
      {
        headers: {
          email: this.email,
        },
      }
    );
    const data = response.data;
    return data;
  }

  async addCart(products, size) {
    const response = await this.httpClient.post(
      `/carts/${products.id}`,
      {
        product: products,
        quantity: 1,
        size: size,
      },
      {
        headers: {
          email: this.email,
        },
      }
    );
    const data = response.data;

    return data;
  }

  async deleteCart(productId, size) {
    return this.httpClient.delete(`/carts/${productId}`, {
      headers: {
        email: this.email,
      },
      data: { size: size },
    });
  }
}
