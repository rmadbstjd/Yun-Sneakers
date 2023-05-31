import axios from "axios";
import { instance } from "./../utils/instance";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export async function getSearchedPrdocuts(
  keyword,
  sort,
  collectionName,
  priceOrder,
  page
) {
  try {
    const response = await httpClient.get("search/products", {
      params: { keyword, sort, collectionName, priceOrder, page, offset: 10 },
    });
    if (response.statusText) {
      const data = response.data;
      const products = data.products;
      const count = data.count;
      return { products, count };
    }
  } catch (error) {
    return false;
  }
}

export async function getAllProducts(page) {
  try {
    const response = await httpClient.get("allproducts", {
      headers: {
        page,
      },
    });
    if (response.statusText) {
      const data = response.data;
      const products = data.products;
      const count = data.count;
      return { products, count };
    }
  } catch (error) {
    return false;
  }
}

export async function getNewProducts(currentPage) {
  try {
    if (!currentPage) currentPage = 1;
    const response = await httpClient.post("newproducts", {
      currentPage,
    });
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getPopularProducts(currentPage) {
  try {
    if (!currentPage) currentPage = 1;
    const response = await httpClient.post("popularproducts", {
      currentPage,
    });
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getUniqueProducts(currentPage) {
  try {
    if (!currentPage) currentPage = 1;
    const response = await httpClient.post("uniqueproducts", {
      currentPage,
    });
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getSimilarProducts(category, productId) {
  try {
    const response = await httpClient.post("similarproducts", {
      category,
      productId,
    });
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getProductInfo(id) {
  try {
    const response = await httpClient.get(`product/${id}`);
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function addProduct(product, image) {
  try {
    const response = await httpClient.post("/product", {
      id: product.id,
      name: product.title,
      category: product.category,
      size: product.size,
      price: product.price,
      image,
      description: product.description,
    });
    if (response.statusText) return true;
  } catch (error) {
    return false;
  }
}

export async function editProduct(product, image, productId) {
  await httpClient.put("/product", {
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

export async function deleteProduct(productId) {
  try {
    const response = await httpClient.delete(`/product`, {
      data: { productId },
    });
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export async function getBrandsName() {
  try {
    const response = await httpClient.get("products/brandsname", {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
}

export const getOrderedProducts = async () => {
  try {
    const response = await instance.get(`/order`, {});
    if (response.statusText) return response.data;
  } catch (error) {
    return false;
  }
};
