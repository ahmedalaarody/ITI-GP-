import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white p-4 sm:p-6 flex justify-between items-center shadow-lg rounded-b-xl mb-6">
      <div className="flex items-center gap-6">
        <NavLink to="/products" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">
          <FaShoppingCart className="inline-block mr-2" />
          Ahmed Shop
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition duration-300 px-3 py-2 rounded-md ${
              isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
            }`
          }
        >
          Products
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 transition duration-300 px-3 py-2 rounded-md flex items-center gap-1 ${
              isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
            }`
          }
        >
          <FaUserCircle className="text-lg" /> Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center gap-1 shadow-md"
        >
          <FaSignOutAlt className="text-lg" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
