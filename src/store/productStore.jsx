import { create } from "zustand";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  selectSize: "",
  setSelectSize: (size) => set((state) => ({ selectSize: size })),
  setInitSize: () => set((state) => ({ selectSize: "" })),
});
const productStore = create(devtools(store));
export default productStore;
