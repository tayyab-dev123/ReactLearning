// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import { Home } from "./ui/Home";
import Error from "./ui/Error";
import { Menu, Loader as menuLoader } from "./features/menu/Menu";
import {
  Action as createOrderAction,
  CreateOrder,
} from "./features/order/CreateOrder";
import { Loader as orderLoader, Order } from "./features/order/Order";
import { Cart } from "./features/cart/Cart";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
