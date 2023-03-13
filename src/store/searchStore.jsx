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

  showBar: true,
  setShowBar: (boolean) => set((state) => ({ showBar: boolean })),
  reset: false,
  setReset: (boolean) => set((state) => ({ reset: boolean })),
  showNavbar: true,
  setShowNavbar: (boolean) => set((state) => ({ showNavbar: boolean })),
});
const searchStore = create(devtools(store));
export default searchStore;
