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
  }

  async getCarts() {
    const email = localStorage.getItem("email");

    return this.httpClient
      .get("/cart", {
        headers: {
          email: email,
        },
      })
      .then((res) => res.data);
  }
  async getCartsTest() {
    const email = localStorage.getItem("email");

    const response = await this.httpClient.get("/cart", {
      headers: {
        email: email,
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
    const email = localStorage.getItem("email");
    const response = await this.httpClient.put(
      `/carts/${productId}`,
      {
        quantity: quantity,
        size: size,
      },
      {
        headers: {
          email: email,
        },
      }
    );
    const data = response.data;
    return data;
  }

  async addCart(products, size) {
    const email = localStorage.getItem("email");

    return this.httpClient.post(
      `/carts/${products.id}`,
      {
        product: products,
        quantity: 1,
        size: size,
      },
      {
        headers: {
          email: email,
        },
      }
    );
  }

  async deleteCart(productId, size) {
    const email = localStorage.getItem("email");

    return this.httpClient.delete(`/carts/${productId}`, {
      headers: {
        email: email,
      },
      data: { size: size },
    });
  }
}
