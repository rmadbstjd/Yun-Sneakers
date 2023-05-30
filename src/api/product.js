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
  const response = await httpClient.get("search/products", {
    params: { keyword, sort, collectionName, priceOrder, page, offset: 10 },
  });
  const data = response.data;
  const products = data.products;
  const count = data.count;
  return { products, count };
}

export async function getAllProducts(page) {
  const response = await httpClient.get("allproducts", {
    headers: {
      page,
    },
  });
  const data = response.data;
  const products = data.products;
  const count = data.count;

  return { products, count };
}

export async function getNewProducts(currentPage) {
  if (!currentPage) currentPage = 1;

  const response = await httpClient.post("newproducts", {
    currentPage,
  });
  const data = response.data;
  return data;
}

export async function getPopularProducts(currentPage) {
  if (!currentPage) currentPage = 1;
  const response = await httpClient.post("popularproducts", {
    currentPage,
  });
  const data = response.data;
  return data;
}

export async function getUniqueProducts(currentPage) {
  if (!currentPage) currentPage = 1;
  const response = await httpClient.post("uniqueproducts", {
    currentPage,
  });
  const data = response.data;
  return data;
}

export async function getSimilarProducts(category, productId) {
  const response = await httpClient.post("similarproducts", {
    category,
    productId,
  });
  const data = response.data;
  return data;
}

export async function getProductInfo(id) {
  const response = await httpClient.get(`product/${id}`);
  const data = response.data;
  if (data.error) return "error";
  return data;
}

export async function addProduct(product, image) {
  await httpClient.post("/product", {
    id: product.id,
    name: product.title,
    category: product.category,
    size: product.size,
    price: product.price,
    image,
    description: product.description,
  });
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
  const response = await httpClient.delete(`/product`, {
    data: { productId },
  });
  const data = response.data;
  return data;
}

export async function getBrandsName() {
  const response = await httpClient.get("products/brandsname", {});
  const data = response.data;
  return data;
}

export const getOrderedProducts = async () => {
  const response = await instance.get(`/order`, {});
  return response.data;
};
