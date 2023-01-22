import axios from "axios";
export default class Cart {
  constructor() {
    this.httpClient = axios.create(
      {
        baseURL: "http://52.79.248.58/api",
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

  async getAddress() {
    const response = await this.httpClient.get("/address", {
      headers: {
        email: this.email,
      },
    });
    const data = response.data;
    console.log("data", data);
    if (data) {
      return data;
    } else {
      return false;
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
  async addShipAddress(
    shipPlaceName,
    shipReceiver,
    shipPostCode,
    shipAddress,
    shipAddressDetail,
    numInput1,
    numInput2,
    numInput3
  ) {
    const response = await this.httpClient.post(
      `/address`,
      {
        place: shipPlaceName,
        receiver: shipReceiver,
        postCode: shipPostCode,
        address: shipAddress,
        addressDetail: shipAddressDetail,
        phoneNumber1: String(numInput1),
        phoneNumber2: String(numInput2),
        phoneNumber3: String(numInput3),
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
