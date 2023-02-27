import { create } from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";
const store = (set) => ({
  searchWord: "",
  setSearchWord: (keyword) => set((state) => ({ searchWord: keyword })),
  recentKeyword: JSON.parse(localStorage.getItem("recentKeyword")) || [],
  addRecentKeyword: (keyword) =>
    set(
      produce((state) => {
        state.recentKeyword.push(keyword);
      })
    ),

  setRecentKeyword: (keyword) =>
    set((state) => ({
      recentKeyword: state.recentKeyword.filter((el) => el !== keyword),
    })),
  allDeleteRecentKeyword: () => set((state) => ({ recentKeyword: [] })),

  sort: "popular",
  initSort: (some) => set((state) => ({ sort: some })),
  setSortPopular: () => set((state) => ({ sort: "popular" })),
  setSortNew: () => set((state) => ({ sort: "new" })),
});
const searchStore = create(devtools(store));
export default searchStore;
