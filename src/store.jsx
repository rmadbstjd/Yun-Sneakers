import create from "zustand";
import produce from "immer";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import Cart from "./api/cart";
import Product from "./api/product";
import Like from "./api/like";
import User from "./api/user";
const store = (set) => ({
  cart: new Cart(),
  product: new Product(),
  like: new Like(),
  user: new User(),
  newProduct: {
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  },
  setNewProduct: (col, row) =>
    set(
      produce((draft) => {
        draft.newProduct[col] = row;
      })
    ),
  setInitNewProduct: () =>
    set(
      produce((draft) => {
        draft.newProduct = {
          url: "",
          title: "",
          price: "",
          category: "",
          description: "",
          size: "",
        };
      })
    ),

  currentProduct: {
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  },
  setCurrentProduct: (product) =>
    set(
      produce((draft) => {
        draft.currentProduct = {
          url: product.image,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          size: product.size,
        };
      })
    ),
  size: "",
  setSize: (size) => set((state) => ({ size: size })),
  setInitSize: () => set((state) => ({ size: "" })),
  last: false,
  setLast: (boolean) => set((state) => ({ last: boolean })),
  willAddProduct: {
    id: "",
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  },
  test: null,
  setWillAddProduct: (product) =>
    set(
      produce((draft) => {
        draft.willAddProduct = {
          id: product.id,
          url: product.url,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          size: product.size,
        };
      })
    ),
  totalCount: 0,
  initTotalCount: (init) => set((state) => ({ totalCount: init })),
  plusTotalCount: () => set((state) => ({ totalCount: state.totalCount + 1 })),
  minusTotalCount: () => set((state) => ({ totalCount: state.totalCount - 1 })),
  deleteTotalCount: (count) =>
    set((state) => ({ totalCount: state.totalCount - count })),
  totalPrice: 0,
  initTotalPrice: (init) => set((state) => ({ totalPrice: init })),
  plusTotalPrice: (price) =>
    set((state) =>
      typeof state.totalPrice === "number"
        ? { totalPrice: state.totalPrice + price }
        : { totalPrice: Number(state.totalPrice.replace(/,/g, "")) + price }
    ),
  minusTotalPrice: (price) =>
    set((state) =>
      typeof state.totalPrice === "number"
        ? { totalPrice: state.totalPrice - price }
        : { totalPrice: Number(state.totalPrice.replace(/,/g, "")) - price }
    ),
  productCount: 0,
  plusProductCount: () =>
    set((state) => ({ productCount: state.productCount + 1 })),
  minusProductCount: () =>
    set((state) => ({ productCount: state.productCount - 1 })),
  cartCount: 0,
  initCartCount: () => set((state) => ({ cartCount: 0 })),
  plusCartCount: (count) =>
    set((state) => ({ cartCount: state.cartCount + count })),
  minusCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
  deletes: false,
  change: false,
  likeDeletes: 0,
  setLikeDeletes: () =>
    set((state) => ({ likeDeletes: state.likeDeletes + 1 })),
  setChange: () => set((state) => ({ change: !state.change })),
  setDeletes: () => set((state) => ({ deletes: !state.deletes })),
  text: "",
  setText: (keyword) => set((state) => ({ text: keyword })),
  sort: "popular",
  initSort: (some) => set((state) => ({ sort: some })),
  setSortPopular: () => set((state) => ({ sort: "popular" })),
  setSortNew: () => set((state) => ({ sort: "new" })),
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
  number: "",
  setNumber: (some) => set((state) => ({ number: some })),
  info: "",
  setInfo: (some) => set((state) => ({ info: some })),
  shipPlaceName: "",
  setShipPlaceName: (keyword) => set((state) => ({ shipPlaceName: keyword })),
  shipReceiver: "",
  setShipReceiver: (keyword) => set((state) => ({ shipReceiver: keyword })),
  shipPostCode: "",
  setShipPostCode: (keyword) => set((state) => ({ shipPostCode: keyword })),
  card: "카드사를 선택해주세요.",
  setCard: (keyword) => set((state) => ({ card: keyword })),
  numInput1: "",
  setNumInput1: (keyword) => set((state) => ({ numInput1: keyword })),
  numInput2: "",
  setNumInput2: (keyword) => set((state) => ({ numInput2: keyword })),
  numInput3: "",
  setNumInput3: (keyword) => set((state) => ({ numInput3: keyword })),
  defaultAddress: false,
  setDefaultAddress: () =>
    set((state) => ({ defaultAddress: !state.defaultAddress })),
  shipAddress: "",
  setShipAddress: (keyword) => set((state) => ({ shipAddress: keyword })),
  shipAddressDetail: "",
  setShipAddressDetail: (keyword) =>
    set((state) => ({ shipAddressDetail: keyword })),
  nickName: "",
  setNickName: (keyword) => set((state) => ({ nickName: keyword })),
  userId: "",
  setUserId: (keyword) => set((state) => ({ userId: keyword })),
});
const useStore = create(devtools(store));

export default useStore;
