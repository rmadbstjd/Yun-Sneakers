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
    console.log("데이타!", data);
    if (data.success === "true") {
      return data;
    } else {
      return null;
    }
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
    console.log("123", productId, size);
    return this.httpClient.delete(`/carts/${productId}`, {
      headers: {
        email: email,
      },
      data: { size: size },
    });
  }
}
