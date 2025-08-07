import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../API/authApi";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaShoppingCart } from 'react-icons/fa';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData.email, formData.password);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/products");
      toast.success("Login successful! Welcome back.");
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaShoppingCart className="text-3xl text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">Ahmed Shop</h1>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="relative">
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800"
            placeholder="Your email address"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800"
            placeholder="Your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
