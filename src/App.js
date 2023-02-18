import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Main from "./pages/Main";
import ProductDetail from "./pages/Detail";
import LikeProducts from "./pages/Like";
import Root from "./pages/Root";
import NewProducts from "./pages/NewProduct";
import Join from "./pages/Join";
import Login from "./pages/Login";
import SearchPage from "./pages/Search";
import Shipment from "./pages/Shipment";
import Order from "./pages/MyPage/Order";
import Wish from "./pages/MyPage/Wish";
import Address from "./pages/MyPage/Address";
import Review from "./pages/MyPage/Review";
import loginSuccess from "./hooks/loginSuccess";
import useStore from "./store";
function App() {
  const { userId, setNickName, setUserId, isLogin } = useStore();
  useEffect(() => {
    loginSuccess(setNickName, setUserId);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,

      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "/products",
          element: <LikeProducts />,
        },
        {
          path: "/products/:id",
          element: <ProductDetail />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/new",
          element: <NewProducts />,
        },
        {
          path: "/join",
          element: <Join />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },

        {
          path: "/shipment",
          element: <Shipment />,
        },

        {
          path: "/mypage/order",
          element: <Order />,
        },
        {
          path: "/mypage/address",
          element: <Address />,
        },
        {
          path: "/mypage/wish",
          element: <Wish />,
        },
        {
          path: "/mypage/review",
          element: <Review />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
