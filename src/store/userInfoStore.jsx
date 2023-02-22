import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";
import Cart from "../api/cart";
import Product from "../api/product";
import Like from "../api/like";
import User from "../api/user";
import MyPage from "../api/myPage";
import Order from "../api/order";
const store = (set) => ({
  cart: new Cart(),
  product: new Product(),
  like: new Like(),
  user: new User(),
  myPage: new MyPage(),
  order: new Order(),

  nickName: "",
  setNickName: (keyword) => set((state) => ({ nickName: keyword })),
  userId: "",
  setUserId: (keyword) => set((state) => ({ userId: keyword })),

  shipPlaceName: "",
  setShipPlaceName: (keyword) => set((state) => ({ shipPlaceName: keyword })),
  shipReceiver: "",
  setShipReceiver: (keyword) => set((state) => ({ shipReceiver: keyword })),
  shipPostCode: "",
  setShipPostCode: (keyword) => set((state) => ({ shipPostCode: keyword })),
  card: "카드사를 선택해주세요.",
  setCard: (keyword) => set((state) => ({ card: keyword })),
  phoneNumInput1: "",
  setPhoneNumInput1: (keyword) => set((state) => ({ phoneNumInput1: keyword })),
  phoneNumInput2: "",
  setPhoneNumInput2: (keyword) => set((state) => ({ phoneNumInput2: keyword })),
  phoneNumInput3: "",
  setPhoneNumInput3: (keyword) => set((state) => ({ phoneNumInput3: keyword })),

  defaultAddress: false,
  setDefaultAddress: () =>
    set((state) => ({ defaultAddress: !state.defaultAddress })),
  shipAddress: "",
  setShipAddress: (keyword) => set((state) => ({ shipAddress: keyword })),
  shipAddressDetail: "",
  setShipAddressDetail: (keyword) =>
    set((state) => ({ shipAddressDetail: keyword })),
});
const userInfoStore = create(devtools(store));

export default userInfoStore;
