import { Navigate, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { Products } from "../pages/products/Products";
import AddProduct from "../pages/products/components/AddProduct";
import EditProduct from "../pages/products/components/EditProduct";
import ProductDetails from "../pages/products/components/productsDetails";
import { Profile } from "../pages/profile/Profile";
import RootLayout from "../RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/products" /> },
      { path: "profile", element: <Profile /> },
      { path: "products", element: <Products /> },
      { path: "products/add-product", element: <AddProduct /> },
      { path: "products/edit/:id", element: <EditProduct /> },
      { path: "products/details/:id", element: <ProductDetails /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
