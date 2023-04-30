import { create } from "zustand";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  cartCount: 0,
  initCartCount: () => set((state) => ({ cartCount: 0 })),
  plusCartCount: (count) =>
    set((state) => ({ cartCount: state.cartCount + count })),
  minusCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
});
const cartStore = create(devtools(store));
export default cartStore;
