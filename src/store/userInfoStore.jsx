import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  card: "카드사를 선택해주세요.",
  setCard: (keyword) => set((state) => ({ card: keyword })),
  defaultAddress: false,
  setDefaultAddress: () =>
    set((state) => ({ defaultAddress: !state.defaultAddress })),
});
const userInfoStore = create(devtools(store));

export default userInfoStore;
