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
    console.log("이메일", email);
    return this.httpClient
      .get("/cart", {
        headers: {
          email: email,
        },
      })
      .then((res) => res.data);
  }

  async addCart(products, size) {
    const email = localStorage.getItem("email");
    console.log("이메일", email);
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
}
