import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Root from "./pages/Root";
import NewProducts from "./pages/NewProducts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
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
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
