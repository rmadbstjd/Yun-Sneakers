import create from "zustand";
import produce from "immer";
import Product from "../api/product";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  product: new Product(),
  selectSize: "",
  setSelectSize: (size) => set((state) => ({ selectSize: size })),
  setInitSize: () => set((state) => ({ selectSize: "" })),
});
const productStore = create(devtools(store));
export default productStore;
