import { Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="bg-gray-300 h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
