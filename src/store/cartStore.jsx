import create from "zustand";
import produce from "immer";
import Cart from "../api/cart";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  cart: new Cart(),
  cartCount: 0,
  initCartCount: () => set((state) => ({ cartCount: 0 })),
  plusCartCount: (count) =>
    set((state) => ({ cartCount: state.cartCount + count })),
  minusCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
});
const cartStore = create(devtools(store));
export default cartStore;
